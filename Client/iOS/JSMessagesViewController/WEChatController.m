//
//  Created by Jesse Squires
//  http://www.hexedbits.com
//
//
//  Documentation
//  http://cocoadocs.org/docsets/JSMessagesViewController
//
//
//  The MIT License
//  Copyright (c) 2013 Jesse Squires
//  http://opensource.org/licenses/MIT
//

#import "WEChatController.h"
#import "JSMessage.h"
#import "UIColor+UIColor_Additions.h"
#import "UIImage+Additions.h"
#import "AppDelegate.h"

@implementation WEChatController

#pragma mark - View lifecycle

- (void)viewDidLoad
{
    self.delegate = self;
    self.dataSource = self;
    [super viewDidLoad];
    
    self.timer = [NSTimer scheduledTimerWithTimeInterval:15.0
                                                  target:self
                                                  selector:@selector(loadMessages)
                                                  userInfo:nil
                                                  repeats:YES];

    
    [[JSBubbleView appearance] setFont:[UIFont fontWithName:[UIFont pmTextFont] size:12.0f]];
    
    self.title = @"Messages";
    self.messageInputView.textView.placeHolder = @"New Message";
    
    [self setBackgroundColor:[UIColor whiteColor]];
    
    self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFastForward
                                                                                           target:self
                                                                                           action:@selector(buttonPressed:)];
    
    
    self.tableView.frame = CGRectMake(0, 50, 320, self.tableView.frame.size.height - 52);
    
    UIButton *backButton = [UIButton buttonWithType:UIButtonTypeCustom];
    backButton.frame = CGRectMake(0, 6, 48, 48);
    [backButton addTarget:self action:@selector(dismissViewTapped:) forControlEvents:UIControlEventTouchUpInside];
    backButton.showsTouchWhenHighlighted = YES;
    
    [backButton setImage:[UIImage imageNamed:@"left-512" tintColor:[UIColor pmOnColor] style:UIImageTintedStyleKeepingAlpha] forState:UIControlStateNormal];
    [backButton setImage:[UIImage imageNamed:@"left-512" tintColor:[UIColor pmOffColor] style:UIImageTintedStyleKeepingAlpha] forState:UIControlStateHighlighted];
    
    
    backButton.imageEdgeInsets = UIEdgeInsetsMake(10, 10, 10, 10);
    
    [self.view addSubview:backButton];


    
}

-(void) setMessagingUsers:(NSArray*)users {
    
    
    
    for (NSUInteger i = 0; i < 1; i++) {
        [self.messages addObjectsFromArray:self.messages];
    }
    
    AppDelegate* d = (AppDelegate*)[[UIApplication sharedApplication] delegate];
    
    self.avatars = [[NSMutableDictionary alloc] init];
    self.messages = [[NSMutableArray alloc] init];
    
    int avatarCount = [users count];
    for (int i = 0; i < avatarCount; i ++) {

        WEUser* user = [[d userCache] userForId:((WEUser*)[users objectAtIndex:i])._id];

        if (i==0) {
            self.fromUser = user;
            self.sender = user.firstName;
        }
        
        if (i==1) {
            self.toUser = user;
        }
        
        NSLog(@"User name %@ , image %@ " , user.firstName , user.avatarImage );
        
        [self.avatars setObject:[JSAvatarImageFactory avatarImage:user.avatarImage croppedToCircle:YES] forKey:user.firstName];
        
        //[self.messages addObject:[[JSMessage alloc] initWithText:@"Weever is the greatest new social discovery and group messaging app" sender:user.firstName date:[NSDate distantPast]]];
    }
    
    [self loadMessages];


}

-(void) dismissViewTapped:(id)sender {
    
    [self.timer invalidate];
    self.timer    = nil;

    
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [self scrollToBottomAnimated:YES];
}

#pragma mark - Actions

- (void)buttonPressed:(UIBarButtonItem *)sender
{
    // Testing pushing/popping messages view
    WEChatController *vc = [[WEChatController alloc] initWithNibName:nil bundle:nil];
    [self.navigationController pushViewController:vc animated:YES];
}

#pragma mark - Table view data source

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.messages.count;
}

#pragma mark - Messages view delegate: REQUIRED

- (void)didSendText:(NSString *)text fromSender:(NSString *)sender onDate:(NSDate *)date
{
    if ((self.messages.count - 1) % 2) {
        [JSMessageSoundEffect playMessageSentSound];
    }
    else {
        // for demo purposes only, mimicing received messages
        [JSMessageSoundEffect playMessageReceivedSound];
        // sender = arc4random_uniform(10) % 2 ? self.fromUser.firstName : self.toUser.firstName;
    }
    
    [self.messages addObject:[[JSMessage alloc] initWithText:text sender:sender date:date]];
    
    [self postMessage:text];
    
    [self finishSend];
    [self scrollToBottomAnimated:YES];
}

- (JSBubbleMessageType)messageTypeForRowAtIndexPath:(NSIndexPath *)indexPath
{
//    if ([(NSString*)[[self.messageList objectAtIndex:indexPath.row] objectForKey:@"fromUser"] isEqualToString:self.fromUser._id]) {
    if ([((JSMessage*)[self.messages objectAtIndex:indexPath.row]).sender isEqualToString:self.fromUser.firstName]) {
        return JSBubbleMessageTypeOutgoing;
    } else {
        return JSBubbleMessageTypeIncoming;
    }
    
    return JSBubbleMessageTypeOutgoing; // JSBubbleMessageTypeIncoming
    
}

- (UIImageView *)bubbleImageViewWithType:(JSBubbleMessageType)type
                       forRowAtIndexPath:(NSIndexPath *)indexPath
{
    
    if (type == JSBubbleMessageTypeOutgoing) {
        return [JSBubbleImageViewFactory bubbleImageViewForType:type
                                                          color:[UIColor pmNeutralLightColor]];
        
    } else {
        
        return [JSBubbleImageViewFactory bubbleImageViewForType:type
                                                          color:[UIColor pmMainColor]];
        
    }

}

- (JSMessageInputViewStyle)inputViewStyle
{
    return JSMessageInputViewStyleFlat;
}

#pragma mark - Messages view delegate: OPTIONAL

- (BOOL)shouldDisplayTimestampForRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (indexPath.row % 3 == 0) {
        return YES;
    }
    return NO;
}

//
//  *** Implement to customize cell further
//
- (void)configureCell:(JSBubbleMessageCell *)cell atIndexPath:(NSIndexPath *)indexPath
{
    if ([cell messageType] == JSBubbleMessageTypeOutgoing) {
        cell.bubbleView.textView.textColor = [UIColor whiteColor];
    
        if ([cell.bubbleView.textView respondsToSelector:@selector(linkTextAttributes)]) {
            NSMutableDictionary *attrs = [cell.bubbleView.textView.linkTextAttributes mutableCopy];
            [attrs setValue:[UIColor blueColor] forKey:UITextAttributeTextColor];
            
            cell.bubbleView.textView.linkTextAttributes = attrs;
        }
    }
    
    if (cell.timestampLabel) {
        cell.timestampLabel.textColor = [UIColor lightGrayColor];
        cell.timestampLabel.shadowOffset = CGSizeZero;
    }
    
    if (cell.subtitleLabel) {
        cell.subtitleLabel.textColor = [UIColor lightGrayColor];
    }
    
    #if TARGET_IPHONE_SIMULATOR
        cell.bubbleView.textView.dataDetectorTypes = UIDataDetectorTypeNone;
    #else
        cell.bubbleView.textView.dataDetectorTypes = UIDataDetectorTypeAll;
    #endif
}

//  *** Implement to use a custom send button
//
//  The button's frame is set automatically for you
//
//  - (UIButton *)sendButtonForInputView
//

//  *** Implement to prevent auto-scrolling when message is added
//
- (BOOL)shouldPreventScrollToBottomWhileUserScrolling
{
    return YES;
}

// *** Implemnt to enable/disable pan/tap todismiss keyboard
//
- (BOOL)allowsPanToDismissKeyboard
{
    return YES;
}

#pragma mark - Messages view data source: REQUIRED

- (JSMessage *)messageForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return [self.messages objectAtIndex:indexPath.row];
}

- (UIImageView *)avatarImageViewForRowAtIndexPath:(NSIndexPath *)indexPath sender:(NSString *)sender
{
    UIImage *image = [self.avatars objectForKey:sender];
    return [[UIImageView alloc] initWithImage:image];
}

-(void) loadMessages {
    
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    
    NSDictionary *parameters = @{@"fromUser"    : self.fromUser._id ,
                                 @"toUser"      : self.toUser._id,
                                 @"channel"     : @""};
    
    NSLog(@"Message params: %@" , parameters);
    
    NSString* action = @"";
    
    [manager POST:[[baseUrl stringByAppendingString:@"/messages"] stringByAppendingString:action] parameters:parameters
          success:^(AFHTTPRequestOperation *operation, id responseObject) {
              
              //NSLog(@"Success Message Load: %@ ***** %@", operation.responseString, responseObject);
              
              self.messageList = responseObject;
              [self.messages removeAllObjects];
              
              NSLog(@"count- %i" , self.messageList.count);
              
              for (int i = 0 ; i < self.messageList.count ; i ++) {
                  
                  NSDateFormatter * formatter1 = [[NSDateFormatter alloc] init];
                  [formatter1 setTimeZone:[NSTimeZone timeZoneForSecondsFromGMT:0]];
                  [formatter1 setLocale:[NSLocale localeWithLocaleIdentifier:@"en_US_POSIX"]];
                  [formatter1 setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss.SSS'Z"];
                  NSDate * date = [formatter1 dateFromString:(NSString*)[[self.messageList objectAtIndex:i] objectForKey:@"timestamp"]];

                  
                  if ([(NSString*)[[self.messageList objectAtIndex:i] objectForKey:@"fromUser"] isEqualToString:self.fromUser._id])
                  {
                      [self.messages addObject:[[JSMessage alloc] initWithText:(NSString*)[[self.messageList objectAtIndex:i] objectForKey:@"message"] sender:self.fromUser.firstName date:date]];
                      
                  } else {
                      [self.messages addObject:[[JSMessage alloc] initWithText:(NSString*)[[self.messageList objectAtIndex:i] objectForKey:@"message"] sender:self.toUser.firstName date:date]];
                  }
                  
              }
              
              NSLog(@"count2 - %i" , self.messages.count);
              
              [self.tableView reloadData];
              [self scrollToBottomAnimated:YES];

              
              
          } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
              NSLog(@"Error: %@", error);
          }];
    
}


-(void) postMessage:(id)message {
    
        AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    
        /*
         fromUser : { type: mongoose.Schema.Types.ObjectId , ref: 'users' },
         toUser : { type: mongoose.Schema.Types.ObjectId , ref: 'users' },
         channel : { type: mongoose.Schema.Types.ObjectId , ref: 'channels' },
         message : String,
         timestamp : { type: Date, default: Date.now }

         */
    
        NSDictionary *parameters = @{@"fromUser"      : self.fromUser._id ,
                                     @"toUser"  : self.toUser._id,
                                     @"channel"     : @"",
                                     @"message" : message };
        
        NSLog(@"Message params: %@" , parameters);
        
        NSString* action = @"create";
    
        [manager POST:[[baseUrl stringByAppendingString:@"/messages/"] stringByAppendingString:action] parameters:parameters
              success:^(AFHTTPRequestOperation *operation, id responseObject) {
                  
                  //NSLog(@"Success Message Create Subscribe: ***** %@",  responseObject);
                  
              } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
                  NSLog(@"Error: %@", error);
              }];
    
}


@end
