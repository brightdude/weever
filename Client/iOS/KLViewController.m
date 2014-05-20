//
//  KLViewController.m
//  KLNoteViewController
//
//  Created by Kieran Lafferty on 2012-12-29.
//  Copyright (c) 2012 Kieran Lafferty. All rights reserved.
//

#import "KLViewController.h"
#import "KLCustomViewController.h"
#import "UIImage+Additions.h"
#import "UIColor+UIColor_Additions.h"
#import "PMProfileController.h"
#import "APPDelegate.h"

@interface KLViewController ()

@end

@implementation KLViewController

- (void)viewDidLoad
{

    [super viewDidLoad];

	// Do any additional setup after loading the view, typically from a nib.
    [self.view setBackgroundColor: [UIColor colorWithWhite:0.9 alpha:1]];
    
    UIImage *addImage= [UIImage imageNamed:@"plus-512" tintColor:[UIColor pmOnColor] style:UIImageTintedStyleKeepingAlpha];
    UIButton *addButton = [UIButton buttonWithType:UIButtonTypeCustom];
    addButton.frame = CGRectMake( self.view.frame.size.width - 60, self.view.frame.origin.y + 20, 32, 32 );
    [addButton addTarget:self action:@selector(onAddProfile:) forControlEvents:UIControlEventTouchUpInside];
    [addButton setImage:addImage forState:UIControlStateNormal];

    [self.view addSubview:addButton];
    
    
    UIImage *backImage= [UIImage imageNamed:@"left-512" tintColor:[UIColor pmOnColor] style:UIImageTintedStyleKeepingAlpha];
    UIButton *backButton = [UIButton buttonWithType:UIButtonTypeCustom];
    backButton.frame = CGRectMake(20, self.view.frame.origin.y + 20, 32, 32 );
    [backButton addTarget:self action:@selector(onDismiss:) forControlEvents:UIControlEventTouchUpInside];
    [backButton setImage:backImage forState:UIControlStateNormal];
    
    [self.view addSubview:backButton];
    
    self.userProfiles = [[NSMutableArray alloc] init];
    
    WEUser* currentUser = [(AppDelegate*)[[UIApplication sharedApplication] delegate] currentUser];
    
    WEUser* newUser = currentUser;
    
    [self.userProfiles addObject:newUser];
    
    NSLog (@" list %i" , [currentUser.other_ids count]);
    
    for (int i = 0 ; i < [currentUser.other_ids count] ; i ++  ) {
        NSLog (@" list %i - %@" , i ,  [currentUser.other_ids objectAtIndex:i]);
        newUser = [[WEUser alloc ] init];
        [newUser initWithId:[currentUser.other_ids objectAtIndex:i] withCompletionBlock:^(id result){
            [self.userProfiles addObject:(WEUser*)result];
        }];
    }
    
    [NSTimer scheduledTimerWithTimeInterval:1
                                     target:self
                                   selector:@selector(loadUsers:)
                                   userInfo:nil
                                    repeats:NO];

    
    //

    
//    UIBarButtonItem *addBarButton = [[UIBarButtonItem alloc] initWithCustomView:addButton];
//    self.navigationItem.leftBarButtonItem = addBarButton;

    
    //Initialize the controller data
//    NSString* plistPath = [[NSBundle mainBundle] pathForResource: @"NavigationControllerData"
//                                                          ofType: @"plist"];
    // Build the array from the plist
//    self.viewControllerData = [[NSArray alloc] initWithContentsOfFile:plistPath];

}

-(void) loadUsers:(id)sender {
    [self reloadDataAnimated:YES];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (NSInteger)numberOfControllerCardsInNoteView:(KLNoteViewController*) noteView {
    
    int retval = [self.userProfiles count];

    return retval;
    
}
- (UIViewController *)noteView:(KLNoteViewController*)noteView viewControllerAtIndex:(NSInteger)index {
    
    PMProfileController* userProfile = [PMProfileController alloc];
    WEUser* user = [self.userProfiles objectAtIndex:index];
    
    NSLog (@"user id - index %i ,  %@" , index,  user._id);
    
    [userProfile initWithUser:user withCompletionBlock:^(id result) {
        userProfile.navigationController.navigationBarHidden = NO;
    }];

    //Return the custom view controller wrapped in a UINavigationController
    return [[UINavigationController alloc] initWithRootViewController:userProfile];
    

}

-(void) noteViewController: (KLNoteViewController*) noteViewController didUpdateControllerCard:(KLControllerCard*)controllerCard toDisplayState:(KLControllerCardState) toState fromDisplayState:(KLControllerCardState) fromState {    

    PMProfileController* current = (PMProfileController*)[(UINavigationController*)[controllerCard viewController] topViewController];
    [current setBarButtonsVisible:(toState == KLControllerCardStateFullScreen)];
    
}
- (IBAction)reloadCardData:(id)sender {
    [self reloadDataAnimated:YES];
    
}

-(void) onAddProfile :(id)sender {
    
    WEUser* currentUser = [(AppDelegate*)[[UIApplication sharedApplication] delegate] currentUser];

    WEUser* newUser;
    
    if ([self.userProfiles count] == 0) {
        newUser = currentUser;
    } else {
        newUser = [[WEUser alloc] init];
        newUser.ownerId = currentUser._id;
        newUser.firstName = currentUser.firstName;
        newUser.avatar = currentUser.avatar;
        newUser.title = currentUser.title;
        newUser.bio = currentUser.bio;
        newUser.card_name = @"Copy";
    
    }
    
    [self.userProfiles addObject:newUser];
    
    [self reloadDataAnimated:YES];

}

-(void) onDismiss :(id)sender {
    [self dismissViewControllerAnimated:YES completion:nil];
}
@end
