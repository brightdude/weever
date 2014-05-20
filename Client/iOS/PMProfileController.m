//
//  PMProfileController.m
//  weever
//
//  Created by Ilia Ridge on 4/5/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//
#import "WEChatController.h"
#import "JSMessage.h"
#import "PMProfileController.h"
#import "AppDelegate.h"

@interface PMProfileController ()

@end

@implementation PMProfileController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

-(void) initWithId:(id)userId {
    [self initWithId:userId withCompletionBlock:^(id result){
        self.user = (WEUser*)result;
    }];
}

-(void) initWithId:(id)userId withCompletionBlock:(void (^)(id))result {
    
    if (!userId) {
        [[WEUser alloc] initWithId:userId withCompletionBlock:^(id newuser) {
            self.user = newuser;
            self.user.ownerId = [(AppDelegate*)[[UIApplication sharedApplication] delegate] currentUser].ownerId;
            result (self.user);
        }];
    }
    else {
        [[WEUser alloc] initWithId:userId withCompletionBlock:^(id newuser) {
            self.user = newuser;
            result (self.user);
        }];
    }

}

-(void) initWithUser:(id)user withCompletionBlock:(void (^)(id))result {
    
        self.user = user;
        result (self.user);

}


-(void)setBarButtonsVisible:(BOOL)visible {
    if (visible) {
        NSLog(@"visible");
        self.navigationItem.leftBarButtonItem.customView.layer.opacity = 1;
        self.navigationItem.rightBarButtonItem.customView.layer.opacity = 1;

    }
    else {
        NSLog(@"hidden");
        self.navigationItem.leftBarButtonItem.customView.layer.opacity = 0;
        self.navigationItem.rightBarButtonItem.customView.layer.opacity = 0;
    }
    
}

- (void)viewWillAppear:(BOOL)animated {
    NSLog (@"User profile will now appear");
    
    UIColor* mainColor = [UIColor colorWithWhite:1.0 alpha:0.9];//[UIColor colorWithRed:222.0/255 green:59.0/255 blue:47.0/255 alpha:1.0f];
    
    [self.navigationItem setTitle:_user.card_name];
    [self.navigationController.navigationBar setBackgroundImage:[UIImage imageWithColor:[UIColor pmOffColor] size:CGSizeMake(5, 5)] forBarMetrics: UIBarMetricsDefault];
    
    [self.navigationController setNavigationBarHidden:NO];

    UIButton *editButton = [UIButton buttonWithType:UIButtonTypeSystem];
    [editButton setTitle:@"Edit" forState:UIControlStateNormal];
    [editButton.titleLabel setFont:[UIFont fontWithName:[UIFont pmTitleTextFont] size:14.0f]];
    [editButton.titleLabel setTextColor:[UIColor pmMainColor]];
    editButton.frame = CGRectMake( self.view.frame.size.width - 60, self.view.frame.origin.y + 20, 48, 32 );
    [editButton addTarget:self action:@selector(startEditing:) forControlEvents:UIControlEventTouchUpInside];
    

    UIButton *cancelButton = [UIButton buttonWithType:UIButtonTypeSystem];
    [cancelButton setTitle:@"Cancel" forState:UIControlStateNormal];
    [cancelButton.titleLabel setFont:[UIFont fontWithName:[UIFont pmTitleTextFont] size:14.0f]];
    [cancelButton.titleLabel setTextColor:[UIColor pmMainColor]];
    cancelButton.frame = CGRectMake( self.view.frame.size.width - 60, self.view.frame.origin.y + 20, 48, 32 );
    [cancelButton addTarget:self action:@selector(doneEditing:) forControlEvents:UIControlEventTouchUpInside];

    
    
    UIBarButtonItem *editBarButton = [[UIBarButtonItem alloc] initWithCustomView:editButton];
    UIBarButtonItem *cancelBarButton = [[UIBarButtonItem alloc] initWithCustomView:cancelButton];

    self.navigationItem.leftBarButtonItem = editBarButton;
    self.navigationItem.rightBarButtonItem = cancelBarButton;

    //[self setBarButtonsVisible:NO];
    
    NSString* fontName = @"GillSans-Italic";
    NSString* boldFontName = @"GillSans-Bold";
    
    self.nameLabel.textColor =  [UIColor whiteColor];
    self.nameLabel.font =  [UIFont fontWithName:boldFontName size:18.0f];
    self.nameLabel.text =  [NSString stringWithFormat:@"%@ %@" , _user.firstName , _user.lastName] ;
    
    self.locationLabel.textColor =  [UIColor whiteColor];
    self.locationLabel.font =  [UIFont fontWithName:fontName size:14.0f];
    self.locationLabel.text = _user.title;
    
    UIFont* countLabelFont = [UIFont fontWithName:boldFontName size:20.0f];
    self.followerCountLabel.textColor =  mainColor;
    self.followerCountLabel.font =  countLabelFont;
    self.followerCountLabel.text = @"132k";
    
    self.followingCountLabel.textColor =  mainColor;
    self.followingCountLabel.font =  countLabelFont;
    self.followingCountLabel.text = @"200";
    
    self.updateCountLabel.textColor =  mainColor;
    self.updateCountLabel.font =  countLabelFont;
    self.updateCountLabel.text = @"20k";
    
    
    UIFont* socialFont = [UIFont fontWithName:boldFontName size:7.0f];
    UIColor* socialColor = [UIColor lightGrayColor];
    
    self.followerLabel.textColor =  socialColor;
    self.followerLabel.font =  socialFont;
    self.followerLabel.text = @"FOLLOWERS";
    
    self.followingLabel.textColor =  socialColor;
    self.followingLabel.font =  socialFont;
    self.followingLabel.text = @"FOLLOWING";
    
    self.updateLabel.textColor =  socialColor;
    self.updateLabel.font =  socialFont;
    self.updateLabel.text = @"UPDATES";
    
    
    UIFont* labelFont = [UIFont fontWithName:boldFontName size:12.0f];
    
    
    self.bioLabel.textColor =  mainColor;
    self.bioLabel.font =  labelFont;
    self.bioLabel.text = @"Bio";
    
    self.friendLabel.textColor =  mainColor;
    self.friendLabel.font =  labelFont;
    self.friendLabel.text = @"Friends";
    
    UIFont* valueFont = [UIFont fontWithName:fontName size:12.0f];
    
    self.joinedValueLabel.textColor =  mainColor;
    self.joinedValueLabel.font =  valueFont;
    self.joinedValueLabel.text = _user.formattedCreateDate;
    
    self.joinedLabel.textColor =  mainColor;
    self.joinedLabel.font =  labelFont;
    self.joinedLabel.text = @"Joined";
    
    
    self.bioValueLabel.textColor =  mainColor;
    self.bioValueLabel.font =  valueFont;
    self.bioValueLabel.text = _user.bio;
    
    self.view.backgroundColor = [UIColor pmOffColor];
    
    self.profileBgImageView.image = _user.coverImage;
    self.profileBgImageView.contentMode = UIViewContentModeScaleAspectFill;
    self.profileBgImageView.layer.borderColor = [UIColor whiteColor].CGColor;
    self.profileBgImageView.clipsToBounds = YES;
    self.profileBgImageView.layer.cornerRadius = 6.0f;
    self.profileBgImageView.layer.borderWidth = 2.0f;

    
    self.profileImageView.contentMode = UIViewContentModeScaleAspectFill;
    self.profileImageView.clipsToBounds = YES;
    self.profileImageView.layer.cornerRadius = 48.0f;
    self.profileImageView.layer.borderWidth = 4.0f;
    self.profileImageView.layer.borderColor = [UIColor whiteColor].CGColor;
    self.profileImageView.image = _user.avatarImage;

    
    self.overlayView.backgroundColor = [UIColor colorWithWhite:0.0f alpha:0.5f];
    
    self.countContainer.backgroundColor = [UIColor colorWithWhite:0.95 alpha:1.0f];
    
    self.joinedContainer.layer.borderColor = [UIColor colorWithWhite:0.9 alpha:0.7].CGColor;
    self.joinedContainer.layer.borderWidth = 1.0f;
    
    self.bioContainer.layer.borderColor = [UIColor colorWithWhite:0.9 alpha:0.7].CGColor;
    self.bioContainer.layer.borderWidth = 1.0f;
    
    self.friendContainer.layer.borderColor = [UIColor colorWithWhite:0.9 alpha:0.7].CGColor;
    self.friendContainer.layer.borderWidth = 1.0f;
    
    // UIColor* imageBorderColor = [UIColor colorWithRed:222.0/255 green:59.0/255 blue:47.0/255 alpha:0.4f];
    
    //[self styleFriendProfileImage:self.friendImageView1.imageView withImageNamed:@"profile-1.jpg" andColor:imageBorderColor];
    
    UIImage* img = [[UIImage imageNamed:@"speech_bubble_filled-512" tintColor:[UIColor pmOnColor] style:UIImageTintedStyleKeepingAlpha] imageWithCornerInset:UICornerInsetMake(128, 128, 128, 128)];
    [self.friendImageView1 addTarget:self action:@selector(chat:) forControlEvents:UIControlEventTouchUpInside];
    [self.friendImageView1 setImage:img forState:UIControlStateNormal];
    self.friendImageView1.imageView.contentMode = UIViewContentModeScaleAspectFill;
    self.friendImageView1.imageView.clipsToBounds = YES;
    //self.friendImageView1.imageView.layer.cornerRadius = 30.0f;
    //self.friendImageView1.imageView.layer.borderWidth = 4.0f;
    //self.friendImageView1.imageView.layer.borderColor = imageBorderColor.CGColor;
    
    UIImage* img2 = [[UIImage imageNamed:@"lock_filled-512" tintColor:[UIColor pmOnColor] style:UIImageTintedStyleKeepingAlpha] imageWithCornerInset:UICornerInsetMake(128, 128, 128, 128)];
    [self.friendImageView2 addTarget:self action:@selector(startPrivateChannel:) forControlEvents:UIControlEventTouchUpInside];
    [self.friendImageView2 setImage:img2 forState:UIControlStateNormal];
    self.friendImageView2.imageView.contentMode = UIViewContentModeScaleAspectFill;
    self.friendImageView2.imageView.clipsToBounds = YES;

    UIImage* img3 = [[UIImage imageNamed:@"voice_recognition_scan-512" tintColor:[UIColor pmOnColor] style:UIImageTintedStyleKeepingAlpha] imageWithCornerInset:UICornerInsetMake(128, 128, 128, 128)];
    [self.friendImageView3 addTarget:self action:@selector(talk:) forControlEvents:UIControlEventTouchUpInside];
    [self.friendImageView3 setImage:img3 forState:UIControlStateNormal];
    self.friendImageView3.imageView.contentMode = UIViewContentModeScaleAspectFill;
    self.friendImageView3.imageView.clipsToBounds = YES;

    
//    [self styleFriendProfileImage:self.friendImageView2 withImageNamed:@"profile-2.jpg" andColor:imageBorderColor];
//    [self styleFriendProfileImage:self.friendImageView3 withImageNamed:@"profile-3.jpg" andColor:imageBorderColor];

}

-(void)chat:(id)sender {

    //if ([self.user boolForKey:@"Allow Chat"]) {
        
        WEUser* fromUser = [(AppDelegate*)[[UIApplication sharedApplication] delegate] currentUser];
        WEUser* toUser = self.user;
        
        if (![fromUser._id isEqualToString:toUser._id]) {
            
            NSLog (@"Lets chat baby");
            
            NSArray* messagingUsers = [NSArray arrayWithObjects:fromUser, toUser , nil];
            
            WEChatController *vc = [[WEChatController alloc] init];
            [vc setMessagingUsers:messagingUsers];
            
            [self presentViewController:vc animated:YES completion:nil];
            
        }
        
    //}

}

-(void)startPrivateChannel:(id)sender {
    
}

-(void)talk:(id)sender {
    
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    
    
    UIScrollView* scrollView = (UIScrollView*)self.view;
    
    scrollView.contentSize = CGSizeMake(320, 590);
    
    UISwipeGestureRecognizer* recognizerLeft = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(handleSwipeLeft:)];
    [recognizerLeft setDirection:(UISwipeGestureRecognizerDirectionLeft)];
    [self.view addGestureRecognizer:recognizerLeft];


}

-(void) handleSwipeLeft:(UISwipeGestureRecognizer*)recognizer {
    [self dismissViewControllerAnimated:YES completion:nil];
}

-(IBAction)doneEditing:(id)sender {
    
    [self dismissViewControllerAnimated:YES completion:nil];
}

-(IBAction)startEditing:(id)sender {
    
    self.navigationController.navigationBarHidden = NO;

    PMEditProfileController* controller = [[PMEditProfileController alloc] initWithUser:self.user completionHandler:^(id result) {
    
    }];
    
//    [self presentViewController:controller animated:YES completion:nil];
    
    [self.navigationController pushViewController:controller animated:YES];

    
}


-(void)styleFriendProfileImage:(UIImageView*)imageView withImageNamed:(NSString*)imageName andColor:(UIColor*)color{
    
    imageView.image = [UIImage imageNamed:imageName];
    imageView.contentMode = UIViewContentModeScaleAspectFill;
    imageView.clipsToBounds = YES;
    imageView.layer.cornerRadius = 30.0f;
    imageView.layer.borderWidth = 4.0f;
    imageView.layer.borderColor = color.CGColor;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
