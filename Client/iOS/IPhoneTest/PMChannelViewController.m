//
//  PMChannelViewController.m
//  ProxiMore
//
//  Created by Ilia Ridge on 3/15/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "PMChannelViewController.h"
#import "UIScrollView+APParallaxHeader.h"
#import "UIColor+UIColor_Additions.h"
#import "PMChannelHeaderView.h"
#import "PMPostCell.h"
#import "IQFeedbackView.h"
#import "PMConstants.h"


@interface PMChannelViewController ()

@end

@implementation PMChannelViewController



- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    [self.view setBackgroundColor:[UIColor colorWithWhite:0.9f alpha:1.0f]];
    
    [self.navigationController setNavigationBarHidden:YES];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(onUpdateComplete:)
                                                 name:CompletePostMessageNotification
                                               object:nil];
    
    AppDelegate* d = (AppDelegate*)[[UIApplication sharedApplication] delegate];
    
    self.pmCache = [d imageCache];
    
    self.subscribers = [[NSMutableArray alloc] init];
    
    NSArray* subscribers = (NSArray*)[self.channel objectForKey:@"subscribers"];
    int avatarCount = [subscribers count];
    for (int i = 0; i < avatarCount; i ++) {
        
        [[d userCache] userForId:[[subscribers objectAtIndex:i] objectForKey:@"_id"] withCompletionBlock:^(id result) {
            NSLog(@"images found %i" , self.avatarImageCounter);
            [self.subscribers addObject:(WEUser*)result];
            self.avatarImageCounter +=1;
            
            if (self.avatarImageCounter == [subscribers count] ) {
                self.isAllAvatars = YES;
                [self.table reloadData];
                
            }
        }];
    }
    
    self.table = [[UITableView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height - 48) style:UITableViewStylePlain];
    
    PMChannelHeaderView* header = [[PMChannelHeaderView alloc] initWithFrame:CGRectMake(0, 0, 320, 320)];
    
    [header setUpView:self.channel andCompletionBlock:^(id result){
        
        self.table.delegate = self;
        self.table.dataSource = self;
        [self.table addParallaxWithImage:result andHeight:320];
        
    } ];

    // [self.table addParallaxWithImage:[UIImage imageWithColor:[UIColor whiteColor] size:CGSizeMake(320, 320)] andHeight:320];
    
    self.table.autoresizingMask = UIViewAutoresizingFlexibleHeight|UIViewAutoresizingFlexibleWidth;
    [self.table setBackgroundColor:[UIColor clearColor]];
    self.table.separatorStyle = UITableViewCellSeparatorStyleNone;
    
    
    UINib *cellNib = [UINib nibWithNibName:@"PMPostCell" bundle:nil];
    [self.table registerNib:cellNib forCellReuseIdentifier:@"postCell"];

    UIView* bottomBar = [[UIView alloc] init];
    bottomBar.frame = CGRectMake(0, self.view.frame.size.height - 48, self.view.frame.size.width, 48);
    bottomBar.backgroundColor = [UIColor whiteColor];
    
    
    UIButton *backButton = [UIButton buttonWithType:UIButtonTypeCustom];
    backButton.frame = CGRectMake(0, 0, 48, 48);
    [backButton addTarget:self action:@selector(dismissViewTapped) forControlEvents:UIControlEventTouchUpInside];
    backButton.showsTouchWhenHighlighted = YES;
    
    [backButton setImage:[UIImage imageNamed:@"left-512" tintColor:[UIColor pmOnColor] style:UIImageTintedStyleKeepingAlpha] forState:UIControlStateNormal];
    [backButton setImage:[UIImage imageNamed:@"left-512" tintColor:[UIColor pmOffColor] style:UIImageTintedStyleKeepingAlpha] forState:UIControlStateHighlighted];
    

    UIButton *followButton = [UIButton buttonWithType:UIButtonTypeCustom];
    followButton.frame = CGRectMake(self.view.frame.size.width / 2 - 36, 2, 72, 44);
    followButton.imageEdgeInsets = UIEdgeInsetsMake(10, 0, 10, 0);
    [followButton addTarget:self action:@selector(followChannelTapped:) forControlEvents:UIControlEventTouchUpInside];
    
    UIImage *followButtonImage;
    
    NSUInteger index = [(NSArray*)[self.channel objectForKey:@"subscribers"] indexOfObjectPassingTest:^BOOL(NSDictionary* subscribers, NSUInteger idx, BOOL *stop) {
//        NSLog (@" subscr %@ device %@", [subscribers objectForKey:@"device"] , [d getUUID] )  ;
        return [[subscribers objectForKey:@"_id"] isEqualToString:[d currentUser]._id];
        
    }];
    
    if (index == NSNotFound) {
        [followButton  setTitle:@"Follow" forState:UIControlStateNormal];
        [followButton.titleLabel setFont:[UIFont fontWithName:[UIFont pmControlTextFont] size:14.0f]];
        [followButton setTag:0];
        //followButtonImage = [UIImage imageWithColor:[UIColor pmColorGreen] size:CGSizeMake(48, 40)];
        followButtonImage = [[UIImage imageWithColor:[UIColor pmMainColor] size:CGSizeMake(48, 40)] imageWithCornerRadius:2];
    }

    else {
        [followButton  setTitle:@"Un-Follow" forState:UIControlStateNormal];
        [followButton.titleLabel setFont:[UIFont fontWithName:[UIFont pmControlTextFont] size:14.0f]];
        [followButton setTag:1];
        followButtonImage = [[UIImage imageWithColor:[UIColor pmNeutralLightColor] size:CGSizeMake(48, 40)] imageWithCornerRadius:2];
    }

    [followButton  setBackgroundImage:followButtonImage forState:UIControlStateNormal];


    followButton.showsTouchWhenHighlighted = YES;
    
//    UIImage *followButtonImage = [UIImage imageNamed:@"visible-512.png" tintColor:[UIColor grayColor] style:UIImageTintedStyleKeepingAlpha];

    UIButton *postButton = [UIButton buttonWithType:UIButtonTypeCustom];
    postButton.frame = CGRectMake(self.view.frame.size.width - 48, 0, 48, 48);
    postButton.imageEdgeInsets = UIEdgeInsetsMake(8, 8, 8, 8);
    [postButton addTarget:self action:@selector(postChannelTapped) forControlEvents:UIControlEventTouchUpInside];
    postButton.showsTouchWhenHighlighted = YES;
    
    UIImage *postButtonImage = [UIImage imageNamed:@"edit_file-512" tintColor:[UIColor pmMainColor] style:UIImageTintedStyleKeepingAlpha];
    [postButton setImage:postButtonImage forState:UIControlStateNormal];
    
    
    backButton.imageEdgeInsets = UIEdgeInsetsMake(10, 10, 10, 10);
    
    [bottomBar addSubview:backButton];
    [bottomBar addSubview:followButton];
    [bottomBar addSubview:postButton];
    
    [self.view addSubview:self.table];
    
    [self.view addSubview:bottomBar];

    
}

-(void) onUpdateComplete:(id)result {
    
    NSDictionary *userInfo = [result userInfo];
    
    self.channel = userInfo;
    
    [self.table reloadData];
    
}

-(void) dismissViewTapped {

    if (self.navigationController)
        [self.navigationController popViewControllerAnimated:YES];
    else
        [self dismissViewControllerAnimated:YES completion:^{}];
    
}

-(void) followChannelTapped:(UIButton*)sender {
    
    //NSLog(@"button tapped %i" , [sender tag]);
    
    NSDictionary *parameters = @{ @"action" : [NSNumber numberWithInt:[sender tag]], @"channel" : [self.channel objectForKey:@"_id"], };
    
    // NSLog(@"subscribe params: %@" , parameters);
    
    [[NSNotificationCenter defaultCenter] postNotificationName:StartSubscribeChannelNotification object:self userInfo:parameters];
    
    [self dismissViewControllerAnimated:YES completion:^{}];
}

-(void) postChannelTapped {
    // [self dismissViewControllerAnimated:YES completion:^{}];
    
    PMTextEditController* controller = [[PMTextEditController alloc] init];
    [controller setDelegate:self];
    [controller setControlType:1];
    [self presentViewController:controller animated:YES completion:nil];

    return;
    
    IQFeedbackView *bugReport = [[IQFeedbackView alloc] initWithTitle:@"" message:nil image:nil cancelButtonTitle:@"Cancel" doneButtonTitle:@"Post"];

    [bugReport setControlType:1];
    [bugReport setCanAddImage:YES];
    [bugReport setCanEditText:YES];
    
    [bugReport showInViewController:self completionHandler:^(BOOL isCancel, NSString *message, UIImage *image, NSDictionary* returnValues) {
        [bugReport dismiss];
        
        if (!isCancel) {
            
            NSDictionary *parameters = @{
                                         @"channel": [self.channel objectForKey:@"_id"],
                                         @"message" : [returnValues objectForKey:@"message"],
                                         @"color" : [returnValues objectForKey:@"color"],//,
                                         @"image" : [returnValues objectForKey:@"image"],
                                         @"recording" : [returnValues objectForKey:@"recording"],
                                         @"pin" : [returnValues objectForKey:@"pin"],
                                         @"type" : [returnValues objectForKey:@"type"]
                                         //@"loc" :  @[[NSNumber numberWithDouble:[d lastLocation].coordinate.longitude] , [NSNumber numberWithDouble: [d lastLocation].coordinate.atitude]]
                                         };
            
            NSLog(@"post params: %@" , parameters);
            
            [[NSNotificationCenter defaultCenter] postNotificationName:StartPostMessageNotification object:self userInfo:parameters];
            
            
        }
        
        
    }];

}

-(void)onFinishedCreatingContent:(NSDictionary*)data {
    NSLog (@"content data %@" , data);
    

    if (data) {
        // NSLog(@"data %@" , parameters);
        NSDictionary *parameters = @{
                                     @"channel": [self.channel objectForKey:@"_id"],
                                     @"message" : [data objectForKey:@"message"],
                                     @"color" : [data objectForKey:@"color"],//,
                                     @"image" : [data objectForKey:@"image"],
                                     @"fileUrl" : [data objectForKey:@"fileUrl"],
                                     @"recording" : [data objectForKey:@"recording"],
                                     @"pin" : [data objectForKey:@"pin"],
                                     @"type" : [data objectForKey:@"type"]
                                     //@"loc" :  @[[NSNumber numberWithDouble:[d lastLocation].coordinate.longitude] , [NSNumber numberWithDouble: [d lastLocation].coordinate.atitude]]
                                     };

        [[NSNotificationCenter defaultCenter] postNotificationName:StartPostMessageNotification object:self userInfo:parameters];

    }
}




- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    NSArray* messages = [self.channel objectForKey:@"posts"];
    return [messages count] + 1;
}

- (NSIndexPath *)tableView:(UITableView *)tv willSelectRowAtIndexPath:(NSIndexPath *)path
{
    NSArray* messages = [self.channel objectForKey:@"posts"];
    NSDictionary* message = [messages objectAtIndex:path.row-1];

    if ([message objectForKey:@"fileUrl"] && ![[message objectForKey:@"fileUrl"] isEqualToString:@""]){
        return path;

    } else {
        return nil;
    }
    
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    
    if (indexPath.row == 0) {
        
        
        if (!self.profileAvatars) {
        
            if (self.isAllAvatars) {
                
                self.profileAvatars = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:nil];
                [self.profileAvatars setBackgroundColor:[UIColor clearColor]];
                
                if ([self.subscribers count] < 4) {
                    
                    for (int i = 0; i < [self.subscribers count]; i ++) {
                        
                        WEUser* user = [self.subscribers objectAtIndex:i];
                        
                        UIButton* avatarButton = [UIButton buttonWithType:UIButtonTypeCustom];
                        avatarButton.frame = CGRectMake(20 + i* 90, 20 , 75,75);
                        [avatarButton setImage:[user.avatarImage imageWithRoundedBounds] forState:UIControlStateNormal];
                        [avatarButton setTag:i];
                        [avatarButton addTarget:self action:@selector(didTapButton:) forControlEvents:UIControlEventTouchUpInside];
                        [self.profileAvatars addSubview:avatarButton];
                        
                    }
                    
                    
                }
                else {
                    
                    NSMutableArray *set1 = [[NSMutableArray alloc] init];
                    
                    for (int i = 0; i < [self.subscribers count]; i ++) {
                        
                        WEUser* user = [self.subscribers objectAtIndex:i];
                        
                        [set1 addObject:[user.avatarImage imageWithRoundedBounds]];
                        
                    }
                    
                    
                    InfiniteScrollPicker* isp = [[InfiniteScrollPicker alloc] initWithFrame:CGRectMake(0, 0, ([self.subscribers count] > 5) ? 320 : 320, 70)]; // avatarCount * 40
                    [isp setDelegate:self];
                    [isp setParent:self];
                    [isp setItemSize:CGSizeMake(50, 50)];
                    [isp setImageAry:set1];
                    [isp setSelectedItem:0];
                    [isp setBackgroundColor:[UIColor clearColor]];
                    
                    [self.profileAvatars addSubview:isp];
                    
                    
                }
            
                return  self.profileAvatars;
                
            } else {
                return [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:nil];
            }
            
        }
        else {
            return  self.profileAvatars;
        }

    }
    
    static NSString *cellIdentifier = @"postCell";
    
    NSArray* messages = [self.channel objectForKey:@"posts"];
    NSDictionary* message = [messages objectAtIndex:indexPath.row-1];

    PMPostCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];

    //NSLog(@"message %i - %@ " , indexPath.row, message);

    [cell setMessage:message];
    
    [cell.title setText:[message objectForKey:@"content"]];
    
    
    
    return cell;
    
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
//    UIAlertView *messageAlert = [[UIAlertView alloc]
//                                 initWithTitle:@"Row Selected" message:@"You've selected a row" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
//    
//    // Display Alert Message
//    [messageAlert show];
    
    PMPostCell* cell = (PMPostCell*)[tableView cellForRowAtIndexPath:indexPath];
    
    [cell startFileDownloadWithcompletionBlock:^(id file){
        
        if (file) {
            
            self.previewController = [[WEPreviewController alloc] initWithUrl:file];
            [self.previewController.navigationItem setRightBarButtonItem:nil];
            
            [self  presentViewController:self.previewController animated:YES completion:^(void){
                
            }];
            
        }
    }];
}


- (NSInteger)numberOfPreviewItemsInPreviewController:(QLPreviewController *)controller {
    return 1;
}

- (id <QLPreviewItem>)previewController:(QLPreviewController *)controller previewItemAtIndex:(NSInteger)index {
    
    return self.previewUrl;
    
}

- (BOOL)previewController:(QLPreviewController *)controller shouldOpenURL:(NSURL *)url forPreviewItem:(id <QLPreviewItem>)item {
    return YES;
}

//- (CGRect)previewController:(QLPreviewController *)controller frameForPreviewItem:(id <QLPreviewItem>)item inSourceView:(UIView **)view {
//    
//}

-(void) didTapButton:(id)sender {
    [self didTapItemAtIndex:[sender tag]];
}

-(void) didTapItemAtIndex:(NSInteger)index {

    NSLog (@"Image Tapped is %i" , index);
    
    NSArray* subscribers = (NSArray*)[self.channel objectForKey:@"subscribers"];
    
    PMProfileController* userProfile = [PMProfileController alloc];
    [userProfile initWithId:[[subscribers objectAtIndex:index] objectForKey:@"_id"] withCompletionBlock:^(id result){
        
        userProfile.navigationController.navigationBarHidden = NO;
        [userProfile setBarButtonsVisible:YES];
        [self presentViewController:[[UINavigationController alloc] initWithRootViewController:userProfile] animated:YES completion:nil];
        

 //       [self.navigationController pushViewController:[[UINavigationController alloc] initWithRootViewController:userProfile]  animated:YES];
        
    }];
    
}


-(void)infiniteScrollPicker:(InfiniteScrollPicker *)infiniteScrollPicker didSelectAtImage:(UIImage *)image {
    NSLog(@"Image selected %@" , image);
}

- (CGFloat)tableView:(UITableView *)tableView
heightForRowAtIndexPath:(NSIndexPath
                         *)indexPath {
    
    if (indexPath.row == 0)
        return 110;
    
    return 70;
}



- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
 
  //   MyCustomNavController* navController = (MyCustomNavController*)self.parentViewController;
    if( [scrollView.panGestureRecognizer translationInView:self.view].y  < 0.0f ) {
 //       [navController setExpanded:YES animated:YES];
    } else if ([scrollView.panGestureRecognizer translationInView:self.view].y  > 0.0f  ) {
 //       [navController setExpanded:NO animated:YES];
    }
    
}
/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
