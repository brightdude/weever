//
//  ViewController.m
//  RNFrostedSidebar
//
//  Created by Ryan Nystrom on 8/13/13.
//  Copyright (c) 2013 Ryan Nystrom. All rights reserved.
//

#import "RootViewController.h"
#import "PMPersonListCell.h"
#import "WEPersonFeedCell.h"
#import "WEChatController.h"
#import "UIImage+Additions.h"
#import "KLViewController.h"

@interface RootViewController ()

@property (strong, nonatomic) AppDelegate *appDelegate;

@end

@implementation RootViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    id d = [[UIApplication sharedApplication] delegate];

    self.pmCache = [d imageCache];
    
    self.optionIndices = [NSMutableIndexSet indexSetWithIndex:1];
    
    self.channelItems = [[NSMutableArray alloc] init];
    
    self.viewType = 1;
    
    
    NSString* boldFontName = @"Avenir-Black";
    
    //[FlatTheme styleNavigationBarWithFontName:boldFontName andColor:onColor];
    [FlatTheme styleSegmentedControlWithFontName:boldFontName andSelectedColor:[UIColor pmOnColor] andUnselectedColor:[UIColor pmOffColor] andDidviderColor:[UIColor pmDividerColor]];

    
    self.appDelegate = (AppDelegate*)[[UIApplication sharedApplication] delegate];
    
    NSArray *images = @[
                        [UIImage imageNamed:@"profile"],
                        [UIImage imageNamed:@"settings_filled-512" tintColor:[UIColor whiteColor] style:UIImageTintedStyleKeepingAlpha],
                        [UIImage imageNamed:@"unlock_filled-512" tintColor:[UIColor whiteColor] style:UIImageTintedStyleKeepingAlpha],
                        [UIImage imageNamed:@"question_shield-512" tintColor:[UIColor whiteColor] style:UIImageTintedStyleKeepingAlpha],
//                        [UIImage imageNamed:@"plus-512" tintColor:[UIColor whiteColor] style:UIImageTintedStyleKeepingAlpha],
//                        [UIImage imageNamed:@"profile"],
//                        [UIImage imageNamed:@"star"],
                        ];
    NSArray *colors = @[
                        [UIColor pmOnColor],
                        [UIColor pmOnColor],
                        [UIColor pmOnColor],
                        [UIColor pmOnColor],
//                        [UIColor pmOnColor],
//                        [UIColor pmOnColor],
//                        [UIColor pmOnColor],
                        ];
    
    [self.view setBackgroundColor:[UIColor colorWithWhite:0.9 alpha:1.0]];
    
    self.callout = [[RNFrostedSidebar alloc] initWithImages:images selectedIndices:self.optionIndices borderColors:colors];
    
    self.callout.delegate = self;
    self.callout.showFromRight = NO;

    
    UIImageView* titleImage = [[UIImageView new] initWithImage:[UIImage imageNamed:@"online-512.png" tintColor:[UIColor redColor] style:UIImageTintedStyleKeepingAlpha]];
    titleImage.frame = CGRectMake(143, 0, 32, 32);
    
    
    self.titleLabel = [[UILabel alloc] initWithFrame:CGRectMake(144, 14, 32, 32)];
    [self.titleLabel setTextColor:[UIColor redColor]];
    [self.titleLabel setFont:[UIFont systemFontOfSize:12]];
    [self.titleLabel setBackgroundColor:[UIColor clearColor]];
    [self.titleLabel setTextAlignment:NSTextAlignmentCenter];
    
    self.segmentedControl = [self createSegmentedControlWithItems:[NSArray arrayWithObjects:@"MY", @"NEAR", @"PEOPLE", nil]];
    [self.segmentedControl addTarget:self action:@selector(segmentValueChanged:) forControlEvents:UIControlEventValueChanged];
    [self.segmentedControl setTag:999];
    [self.navigationController.navigationBar addSubview:self.segmentedControl];
    
    /* ROOT Menu controller START */
    UIImage *menuImage= [UIImage imageNamed:@"burger.png" tintColor:[UIColor redColor] style:UIImageTintedStyleKeepingAlpha];
    
    UIButton *menuButton = [UIButton buttonWithType:UIButtonTypeCustom];
    menuButton.bounds = CGRectMake( 10, 4, menuImage.size.width, menuImage.size.height );
    [menuButton addTarget:self action:@selector(onBurger:) forControlEvents:UIControlEventTouchUpInside];
    [menuButton setImage:menuImage forState:UIControlStateNormal];
    UIBarButtonItem *menuBarButton = [[UIBarButtonItem alloc] initWithCustomView:menuButton];
    self.navigationItem.leftBarButtonItem = menuBarButton;
    /* ROOT Menu controller END */

    /* ROOT Menu controller START */
    UIImage *addImage= [UIImage imageNamed:@"plus-512" tintColor:[UIColor pmOnColor] style:UIImageTintedStyleKeepingAlpha];
    
    UIButton *addButton = [UIButton buttonWithType:UIButtonTypeCustom];
    addButton.bounds = CGRectMake( 10, 4, 32, 32 );
    [addButton addTarget:self action:@selector(onAddChannel:) forControlEvents:UIControlEventTouchUpInside];
    [addButton setImage:addImage forState:UIControlStateNormal];
    UIBarButtonItem *addBarButton = [[UIBarButtonItem alloc] initWithCustomView:addButton];
    self.navigationItem.rightBarButtonItem = addBarButton;
 
    /* ROOT TableView Start */
    CGRect tframe = CGRectMake(0, self.navigationController.navigationBar.frame.size.height + 20, self.view.frame.size.width, self.view.frame.size.height - self.navigationController.navigationBar.frame.size.height - 20);
    self.table = [[UITableView alloc] initWithFrame:tframe style:UITableViewStylePlain];
    self.table.autoresizingMask = UIViewAutoresizingFlexibleHeight|UIViewAutoresizingFlexibleWidth;
    [self.table setBackgroundColor:[UIColor clearColor]];
    self.table.separatorStyle = UITableViewCellSeparatorStyleNone;
    [self.table setAllowsSelection:YES];
    self.table.delegate = self;
    self.table.dataSource = self;
    
    UINib *cellNib = [UINib nibWithNibName:@"PMFeedCell" bundle:nil];
    [self.table registerNib:cellNib forCellReuseIdentifier:@"feedCell"];
    
    [self.table registerNib:[UINib nibWithNibName:@"WEPersonFeedCell" bundle:nil]  forCellReuseIdentifier:@"personCell"];

    
    self.table.backgroundColor = [UIColor colorWithWhite:0.9 alpha:1.0];
    self.table.separatorColor = [UIColor clearColor];

    [self.table reloadData];
    
    
    [self.view addSubview:self.table];
    

    self.userItems = [[NSMutableArray alloc] init];
    
    /* ROOT TableView END */

    
    //[self.view addSubview:self.menu];

    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(onCreateChannelComplete:)
                                                 name:CompleteCreateChannelNotification
                                               object:nil];
    
    
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(onUpdateComplete:)
                                                 name:CompleteUpdateNotification
                                               object:nil];
    

    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(onChannelSubscribe:)
                                                 name:CompleteSubscribeChannelNotification
                                               object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(onPeerChange:)
                                                 name:PeerFoundNotification
                                               object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(onPeerChange:)
                                                 name:PeerLostNotification
                                               object:nil];
    
    self.mpcHandler = [(AppDelegate*)[[UIApplication sharedApplication] delegate] mpcHandler];


}

-(void) viewWillAppear:(BOOL)animated {
    [self.navigationController setNavigationBarHidden:NO];
}

-(void) onPeerChange:(id)sender {
    
    PMMPCFramework* mpc = [(AppDelegate*)[[UIApplication sharedApplication] delegate] mpcHandler];
    
    NSLog (@"Peer number changed # %lu" , (unsigned long)[mpc.availablePeers count]);
    
    [self.channelItems removeAllObjects];
    
    if (self.userItems)
        [self.channelItems addObjectsFromArray:self.userItems];
        
    if (mpc.availablePeers) {
        for (id obj in mpc.availablePeers) {

            
            NSUInteger index = [self.channelItems indexOfObjectPassingTest:^BOOL(NSDictionary* item, NSUInteger idx, BOOL *stop) {

                return [[item objectForKey:@"_id"] isEqualToString:[obj objectForKey:@"user"]];
            }];
            
            id newObject = [NSDictionary dictionaryWithObjectsAndKeys:[obj objectForKey:@"user"], @"_id" , [obj objectForKey:@"peer"] , @"peer",  nil];

            if (index == NSNotFound) {
                if (![[newObject objectForKey:@"_id"] isEqualToString:[(AppDelegate*)[[UIApplication sharedApplication] delegate] currentUser]._id])
                    [self.channelItems addObject:newObject];
            }
            else {
                [self.channelItems replaceObjectAtIndex:index withObject:newObject];
            }
            
        }
    }
    
    NSUInteger index = [self.channelItems indexOfObjectPassingTest:^BOOL(NSDictionary* item, NSUInteger idx, BOOL *stop) {
        return [[item objectForKey:@"_id"] isEqualToString:[(AppDelegate*)[[UIApplication sharedApplication] delegate] currentUser]._id];
    }];
    
    if (index != NSNotFound) {
        [self.channelItems removeObjectAtIndex:index];
    }
    
    // NSLog (@"User items %i", [self.channelItems count]);

    [self.table reloadData];

}

-(void)startDataSend:(WEUser*)toUser withData:(NSData*)data withContext:(NSDictionary*)dataContext {

    NSLog (@"Inviting to send data");
    
    
    PMMPCFramework* mpcHandler = [(AppDelegate*)[[UIApplication sharedApplication] delegate] mpcHandler];
    
    NSUInteger index = [mpcHandler.availablePeers indexOfObjectPassingTest:^BOOL(NSDictionary* item, NSUInteger idx, BOOL *stop) {
        
        return [toUser._id isEqualToString:[item objectForKey:@"user"]];
    }];
    
    id peer;
    if (index != NSNotFound) {
        peer = [[mpcHandler.availablePeers objectAtIndex:index] objectForKey:@"peer"];
    }
    
    NSLog(@"Data length from Root- %i" , [data length]);
    
    //[mpcHandler setupSession];
    
    [mpcHandler invitePeerToSession:peer withDataToSend:data withContext:dataContext];
    

}
-(void)startChat:(WEUser*)toUser {
    
    WEUser* fromUser = [(AppDelegate*)[[UIApplication sharedApplication] delegate] currentUser];
    
    if (![fromUser._id isEqualToString:toUser._id]) {
        
        NSArray* messagingUsers = [NSArray arrayWithObjects:fromUser, toUser , nil];
        
        WEChatController *vc = [[WEChatController alloc] init];
        [vc setMessagingUsers:messagingUsers];
        
        [self presentViewController:vc animated:YES completion:nil];
        
    }

    
}
-(void)startProvateChannel:(WEUser*)toUser {

    PMTextEditController* controller = [[PMTextEditController alloc] init];
    [controller setDelegate:self];
    [controller setControlType:0];

    WEUser* fromUser = (WEUser*)[(AppDelegate*)[[UIApplication sharedApplication] delegate] currentUser];

    UIImage* img = [UIImage combinedImage:fromUser.avatarImage secondImage:toUser.avatarImage color:[UIColor blackColor]];
    
    
    NSLog (@"image size %f,%f" , img.size.width , img.size.height );
    
    //[self.view addSubview:controller.imageView];
    [controller setControlType:2];
    [self presentViewController:controller animated:YES completion:nil];
    [controller.imageView setImage:img];



}


-(void)segmentValueChanged:(UISegmentedControl*)sender {
    
    NSLog (@"selected segment %i" , sender.selectedSegmentIndex);
    
    if (sender.selectedSegmentIndex == 0) {
        
        [self.channelItems removeAllObjects];
        
        if (self.subscribedItems)
            [self.channelItems addObjectsFromArray:self.subscribedItems];
        NSLog (@"Subscribed items %i", [self.channelItems count]);
        
        [self.table reloadData];


        
    }
    
    if (sender.selectedSegmentIndex == 1) {
        
        [self.channelItems removeAllObjects];
        
        if (self.nearItems)
            [self.channelItems addObjectsFromArray:self.nearItems];

        NSLog (@"Subscribed items %i", [self.channelItems count]);
        
        [self.table reloadData];


    }

    if (sender.selectedSegmentIndex == 2) {
        
        [self onPeerChange:nil];
        
    }

    
    
}

-(void)walkthroughDidDismissView:(id)sender {
    [self.view addSubview:self.table];
}

#pragma mark - TableView DataSource Implementation

-(UISegmentedControl*)createSegmentedControlWithItems:(NSArray*)items{
    
    UISegmentedControl* segmentedControl = [[UISegmentedControl alloc] initWithItems:items];
    
    segmentedControl.frame = CGRectMake(60, 10, 200, 30);
    segmentedControl.selectedSegmentIndex = 1;
    
    return segmentedControl;
}


-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    
    if (self.segmentedControl.selectedSegmentIndex != 2) {
            PMChannelViewController *modal = [[PMChannelViewController alloc] init];
            
            [modal setDelegate:self];
            [modal setChannel:[self.channelItems objectAtIndex:indexPath.row]];
            
            modal.modalPresentationStyle = UIModalPresentationFullScreen;
            
//            [self presentViewController:modal animated:YES completion:^{
//                
//            }];
        [self.navigationController pushViewController:modal animated:YES];
    }
    else {
        
        PMProfileController* userProfile = [PMProfileController alloc];
        [userProfile initWithId:[[self.channelItems objectAtIndex:indexPath.row] objectForKey:@"_id"] withCompletionBlock:^(id result){
            userProfile.navigationController.navigationBarHidden = NO;
            [userProfile setBarButtonsVisible:YES];
            [self presentViewController:[[UINavigationController alloc] initWithRootViewController:userProfile] animated:YES completion:nil];

            
        }];

    }

}

- (NSInteger) tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    
    return [self.channelItems count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    
    AppDelegate* d = (AppDelegate*)[[UIApplication sharedApplication] delegate];

    id row = [self.channelItems objectAtIndex:indexPath.row];
    
    if (self.segmentedControl.selectedSegmentIndex == 2) {
        
        NSLog (@"cell %i , %@" , indexPath.row , row);

        static NSString *cellIdentifier = @"personCell";
        

        WEPersonFeedCell* cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
        
        [cell setDelegate:self];
        
        [[d userCache] userForId:[row objectForKey:@"_id"] withCompletionBlock:^(id result) {
            
            [cell  setUser:(WEUser*)result isPeer:([row objectForKey:@"peer"] != nil)];
            
        }];
        
        
        return cell;
        
    }

    static NSString *cellIdentifier = @"feedCell";
    
    PMFeedCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
    [cell setSelectionStyle:UITableViewCellSelectionStyleNone];
    [cell setUserInteractionEnabled:YES];
    
    [[d userCache] userForId:[row objectForKey:@"ownerId"] withCompletionBlock:^(id result) {
        
        WEUser* user = (WEUser*)result;
        [cell.avatarButton setImage:user.avatarImage];
        cell.avatarButton.contentMode = UIViewContentModeScaleAspectFill;
        cell.avatarButton.clipsToBounds = YES;
        cell.avatarButton.layer.cornerRadius = 30.0f;
        cell.avatarButton.layer.borderWidth = 2.0f;
        cell.avatarButton.layer.borderColor = [UIColor whiteColor].CGColor;

    }];

    NSString* img = (NSString*)[row objectForKey:@"image"];
    
    if (img && ![img isEqualToString:@""]) {
        
        NSString *imageUrlString = [[baseUrl stringByAppendingString:@"/upload/"] stringByAppendingString:[row objectForKey:@"image"]];
        
        [self.pmCache getImage:imageUrlString withCompletionBlock:^(id result){
            NSLog(@"PMCache result is %@" , result);
            
            PMFeedCell *updateCell = (PMFeedCell*)[tableView cellForRowAtIndexPath:indexPath];
            
            if (YES) {
                [updateCell.picImageView setImage:[result tintedImageWithColor:[UIColor blackColor] style:UIImageTintedStyleOverAlpha]];
                [updateCell darken:0.9f withColor:[UIColor blackColor]];
            } else {
                [cell.picImageView setBackgroundColor:[UIColor colorWithHexString:[row objectForKey:@"color"]]];
                [cell.picImageView setImage:nil];
            }
        }
         ];
        
    }
    else {

        [cell.picImageView setBackgroundColor:[UIColor colorWithHexString:[row objectForKey:@"color"]]];
        [cell.picImageView setImage:nil];

    }
    
    
    cell.backgroundColor = [UIColor clearColor];
    //cell.backgroundView = [UIView new];
    cell.selectedBackgroundView = [UIView new];
    [cell darken:0.9f withColor:[UIColor blackColor]];

    
    [cell.nameLabel setText:[row objectForKey:@"name"]];
    
    [cell.updateLabel setText:[[row objectForKey:@"content"] stringByAppendingString:@"\n\n\n\n\n"]];
    
    NSDateFormatter * formatter1 = [[NSDateFormatter alloc] init];
    [formatter1 setTimeZone:[NSTimeZone timeZoneForSecondsFromGMT:0]];
    [formatter1 setLocale:[NSLocale localeWithLocaleIdentifier:@"en_US_POSIX"]];
    [formatter1 setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss.SSS'Z"];
    NSDate * date = [formatter1 dateFromString:(NSString*)[row objectForKey:@"timestamp"]];
    
    
    NSString *relativeDate = [[SORelativeDateTransformer registeredTransformer] transformedValue:date];
    
    NSLog (@"This file was modified %@.", relativeDate);
    
    [cell.dateLabel setText:relativeDate];
    
    NSArray* subscribers = [row objectForKey:@"subscribers"];
    [cell.likeCountLabel setText:[NSString stringWithFormat:@"%i" , [subscribers count]]];
    
    NSArray* posts = [row objectForKey:@"posts"];
    [cell.commentCountLabel setText:[NSString stringWithFormat:@"%i" , [posts count]]];
    
    return cell;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath*)indexPath {
    
    if (self.segmentedControl.selectedSegmentIndex == 2) {
        return 160;
    }

    return 330;
}

/* Notification handlers */
#pragma notification handlers


-(void) onChannelSubscribe:(id)result {

    NSDictionary *userInfo = (NSDictionary*)[result userInfo];
    
    if (!userInfo) {
        
        NSString *cancelTitle = @"Close";
        NSString *message = @"Try Again";
        UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"No Such Channel"
                                                            message:message
                                                           delegate:self
                                                  cancelButtonTitle:cancelTitle
                                                  otherButtonTitles: nil];
        [alertView show];
        
        
    }
    
    NSLog (@"Channel subscribe result %@" , userInfo);
    
}

-(void) onUpdateComplete:(id)result {
    
    NSDictionary *userInfo = [result userInfo];
    self.nearItems = [userInfo objectForKey:@"near"];
    self.subscribedItems = [userInfo objectForKey:@"subscribed"];
    self.uniqueItems = [userInfo objectForKey:@"unique"];
    self.userItems = [userInfo objectForKey:@"users"];
    
//    [self.channelItems removeAllObjects];
//    [self.channelItems addObjectsFromArray:(NSArray*)userInfo];
    
    [self segmentValueChanged:self.segmentedControl];
    
}

-(void) onCreateChannelComplete:(id)result {
    
    NSDictionary *userInfo = [result userInfo];
    
    [self.channelItems addObject:[(NSArray*)userInfo objectAtIndex:0]];
    
    [self.table reloadData];

    
    //self.title = [NSString stringWithFormat:@"%lu" , (unsigned long)[self.channelItems count]];
    
}

#pragma end of notification handlers

- (IBAction)onBurger:(id)sender {
    [self.callout show];
}

#pragma mark - RNFrostedSidebarDelegate

- (BOOL)checkPin:(NSString *)pin {
    
    NSDictionary *parameters = @{
                                    @"action" : [NSNumber numberWithInt:0],
                                    @"pin" : pin
                                };
    
    // NSLog(@"subscribe params: %@" , parameters);
    
    [[NSNotificationCenter defaultCenter] postNotificationName:StartSubscribeChannelNotification object:self userInfo:parameters];
    
    // [self dismissViewControllerAnimated:YES completion:^{}];
    
    return YES;
}

- (NSInteger)pinLenght {
    return 4;
}

- (void)peerChangedStateWithNotification:(NSNotification *)notification {
    // Get the state of the peer.
    int state = [[[notification userInfo] objectForKey:@"state"] intValue];
    
    // We care only for the Connected and the Not Connected states.
    // The Connecting state will be simply ignored.
    if (state != MCSessionStateConnecting) {
        // We'll just display all the connected peers (players) to the text view.
        NSString *allPlayers = @"Other players connected with:\n\n";
        
        for (int i = 0; i < self.appDelegate.mpcHandler.session.connectedPeers.count; i++) {
            NSString *displayName = [[self.appDelegate.mpcHandler.session.connectedPeers objectAtIndex:i] displayName];
            
            allPlayers = [allPlayers stringByAppendingString:@"\n"];
            allPlayers = [allPlayers stringByAppendingString:displayName];
        }
        
        // [self.tvPlayerList setText:allPlayers];
        
        NSLog(@"connected %@" , allPlayers);
        
    }
}

-(void)onAddChannel:(id)sender {
    
    PMTextEditController* controller = [[PMTextEditController alloc] init];
    [controller setDelegate:self];
    [controller setControlType:0];
    [self presentViewController:controller animated:YES completion:nil];

    return;

    IQFeedbackView *bugReport = [[IQFeedbackView alloc] initWithTitle:@"" message:nil image:nil cancelButtonTitle:@"Cancel" doneButtonTitle:@"Create"];
    [bugReport setControlType:0];
    [bugReport setCanAddImage:YES];
    [bugReport setCanEditText:YES];
    
    [bugReport showInViewController:self completionHandler:^(BOOL isCancel, NSString *message, UIImage *image, NSDictionary* returnValues) {
        [bugReport dismiss];
        
        if (!isCancel) {
            
            [[NSNotificationCenter defaultCenter] postNotificationName:StartCreateChannelNotification object:self userInfo:returnValues];
            
        }
        
        
    }];

}

-(void) onJoinPrivateChannel:(id)sender {

    PPPinPadViewController * pinViewController = [[PPPinPadViewController alloc] init];
    pinViewController.delegate = self;
    pinViewController.pinTitle = @"Enter Passcode";
    pinViewController.errorTitle = @"Passcode is not correct";
    pinViewController.cancelButtonHidden = NO; //default is False
    pinViewController.backgroundImage = [UIImage imageNamed:@"pinViewImage"]; //if you need remove the background set a empty UIImage ([UIImage new]) or set a background color
    //    pinViewController.backgroundColor = [UIColor blueColor]; //default is a darkGrayColor
    
    [self presentViewController:pinViewController animated:YES completion:NULL];

}

-(void) onShowUserProfile:(id)sender {

    //        PMUserProfileController* userProfile = [[PMUserProfileController alloc] init];
    //        userProfile.navigationController.navigationBarHidden = NO;
    
    KLViewController* kl = [[KLViewController alloc] init];
    [self presentViewController:kl animated:YES completion:nil];

    
    return;
    
    PMProfileController* userProfile = [PMProfileController alloc];
    [userProfile initWithId:nil withCompletionBlock:^(id result) {
        userProfile.navigationController.navigationBarHidden = NO;
        [self presentViewController:userProfile animated:YES completion:nil];
    }];
    

}

-(void)onShowUserSettings:(id)sender {

    UIStoryboard *sb = [UIStoryboard storyboardWithName:@"PMSettings" bundle:nil];
    UIViewController *vc = [sb instantiateViewControllerWithIdentifier:@"myViewController"];
    //vc.modalTransitionStyle = UIModalTransitionStyleFlipHorizontal;
    //[self.navigationController presentViewController:vc animated:YES completion:nil];
    //[self.navigationController pushViewController:vc animated:YES];
    [self presentViewController:vc animated:YES completion:nil];

}

-(void)onShowNearbyUsers:(id)sender {
    
//    if (self.appDelegate.mpcHandler.session != nil) {
//        [[self.appDelegate mpcHandler] setupBrowser];
//        [[[self.appDelegate mpcHandler] browser] setDelegate:self];
//        
//        [self presentViewController:self.appDelegate.mpcHandler.browser
//                           animated:YES
//                         completion:nil];
//    }
    
    PMPeopleViewController* nearByUsersController = [[PMPeopleViewController alloc] init];
    [self presentViewController:nearByUsersController animated:YES completion:nil];

}

-(void)onShowLoginScreen:(id)sender {

    PMLoginController* userProfile = [[PMLoginController alloc] init];
    userProfile.navigationController.navigationBarHidden = NO;
    
    [self presentViewController:userProfile animated:YES completion:nil];

}

- (void)sidebar:(RNFrostedSidebar *)sidebar didTapItemAtIndex:(NSUInteger)index {
    NSLog(@"Tapped item at index %i",index);

    if (index == 0) {
        
        [self onShowUserProfile:nil];
        
    }
    
    if (index ==1) {
        
        [self onShowUserSettings:nil];

        

    }
    
    if (index == 2) {
        [self onShowNearbyUsers:nil];
        
    }
    
    if (index == 3) {
        
        [self onJoinPrivateChannel:nil];

        
    }

    if (index ==4) {
        [self onAddChannel:nil];
        
    }

    if (index ==5) {
        
        PMTextEditController* controller = [[PMTextEditController alloc] init];
        [self presentViewController:controller animated:YES completion:nil];
        
    }

    
    if (index ==6) {
        
        WEIntroController* gh = [[WEIntroController alloc] init];
        [gh setDelegate:self];
        [self presentViewController:gh animated:YES completion:^(void) {
            
        }];

        
    }
    
    [sidebar dismissAnimated:YES completion:nil];

}

-(void)onFinishedCreatingContent:(NSDictionary*)data {
    NSLog (@"content data %@" , data);
    
    if (data) {
        [[NSNotificationCenter defaultCenter] postNotificationName:StartCreateChannelNotification object:self userInfo:data];
    }
}

//- (void)browserViewControllerDidFinish:(MCBrowserViewController *)browserViewController {
//    [self.appDelegate.mpcHandler.browser dismissViewControllerAnimated:YES completion:nil];
//}
//
//- (void)browserViewControllerWasCancelled:(MCBrowserViewController *)browserViewController {
//    [self.appDelegate.mpcHandler.browser dismissViewControllerAnimated:YES completion:nil];
//}


- (void)sidebar:(RNFrostedSidebar *)sidebar didEnable:(BOOL)itemEnabled itemAtIndex:(NSUInteger)index {
    if (itemEnabled) {
        [self.optionIndices addIndex:index];
    }
    else {
        [self.optionIndices removeIndex:index];
    }
}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    CGRect frame = self.navigationController.navigationBar.frame;
    CGFloat size = frame.size.height - 21;
    CGFloat framePercentageHidden = ((20 - frame.origin.y) / (frame.size.height - 1));
    CGFloat scrollOffset = scrollView.contentOffset.y;
    CGFloat scrollDiff = scrollOffset - self.previousScrollViewYOffset;
    CGFloat scrollHeight = scrollView.frame.size.height;
    CGFloat scrollContentSizeHeight = scrollView.contentSize.height + scrollView.contentInset.bottom;
    
    if (scrollOffset <= -scrollView.contentInset.top) {
        frame.origin.y = 20;
    } else if ((scrollOffset + scrollHeight) >= scrollContentSizeHeight) {
        frame.origin.y = -size;
    } else {
        frame.origin.y = MIN(20, MAX(-size, frame.origin.y - scrollDiff));
    }
    
    [self.navigationController.navigationBar setFrame:frame];
    CGRect tframe = self.table.frame;
    tframe.origin.y = frame.size.height + frame.origin.y;
    [self.table setFrame:tframe];

    [self updateBarButtonItems:(1 - framePercentageHidden)];
    self.previousScrollViewYOffset = scrollOffset;
}

- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView
{
    [self stoppedScrolling];
}

- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView
                  willDecelerate:(BOOL)decelerate
{
    if (!decelerate) {
        [self stoppedScrolling];
    }
}

- (void)stoppedScrolling
{
    CGRect frame = self.navigationController.navigationBar.frame;
    if (frame.origin.y < 20) {
        [self animateNavBarTo:-(frame.size.height - 21)];
    }
}

- (void)updateBarButtonItems:(CGFloat)alpha
{
    
    [self.navigationItem.leftBarButtonItems enumerateObjectsUsingBlock:^(UIBarButtonItem* item, NSUInteger i, BOOL *stop) {
        item.customView.alpha = alpha;
    }];
    
    [self.navigationItem.rightBarButtonItems enumerateObjectsUsingBlock:^(UIBarButtonItem* item, NSUInteger i, BOOL *stop) {
        item.customView.alpha = alpha;
    }];
    
    [self.navigationController.navigationBar.subviews enumerateObjectsUsingBlock:^(UIView* item, NSUInteger i, BOOL *stop) {
        if (item.tag == 999)
            item.alpha = alpha;
    }];
    
    self.navigationItem.titleView.alpha = alpha;
    self.navigationController.navigationBar.tintColor = [self.navigationController.navigationBar.tintColor colorWithAlphaComponent:alpha];
}

- (void)animateNavBarTo:(CGFloat)y
{
    [UIView animateWithDuration:0.2 animations:^{
        CGRect frame = self.navigationController.navigationBar.frame;
        CGFloat alpha = (frame.origin.y >= y ? 0 : 1);
        frame.origin.y = y;
        
        [self.navigationController.navigationBar setFrame:frame];
        [self updateBarButtonItems:alpha];
    }];
}

@end
