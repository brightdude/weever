//
//  PMProfileController.h
//  weever
//
//  Created by Ilia Ridge on 4/5/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "PMEditProfileController.h"

@interface PMProfileController : UIViewController

@property (nonatomic, weak) IBOutlet UIImageView* profileBgImageView;

@property (nonatomic, weak) IBOutlet UIImageView* profileImageView;

@property (nonatomic, weak) IBOutlet UIView* overlayView;

@property (nonatomic, weak) IBOutlet UIButton* friendImageView1;

@property (nonatomic, weak) IBOutlet UIButton* friendImageView2;

@property (nonatomic, weak) IBOutlet UIButton* friendImageView3;

@property (nonatomic, weak) IBOutlet UILabel* nameLabel;

@property (nonatomic, weak) IBOutlet UILabel* locationLabel;

@property (nonatomic, weak) IBOutlet UILabel* followerLabel;

@property (nonatomic, weak) IBOutlet UILabel* followingLabel;

@property (nonatomic, weak) IBOutlet UILabel* updateLabel;

@property (nonatomic, weak) IBOutlet UILabel* followerCountLabel;

@property (nonatomic, weak) IBOutlet UILabel* followingCountLabel;

@property (nonatomic, weak) IBOutlet UILabel* updateCountLabel;

@property (nonatomic, weak) IBOutlet UILabel* joinedLabel;

@property (nonatomic, weak) IBOutlet UILabel* joinedValueLabel;

@property (nonatomic, weak) IBOutlet UILabel* bioLabel;

@property (nonatomic, weak) IBOutlet UILabel* bioValueLabel;

@property (nonatomic, weak) IBOutlet UILabel* friendLabel;

@property (nonatomic, weak) IBOutlet UIView* joinedContainer;

@property (nonatomic, weak) IBOutlet UIView* bioContainer;

@property (nonatomic, weak) IBOutlet UIView* friendContainer;

@property (nonatomic, weak) IBOutlet UIView* countContainer;

@property(nonatomic, strong) WEUser* user;

-(void)styleFriendProfileImage:(UIImageView*)imageView withImageNamed:(NSString*)imageName andColor:(UIColor*)color;
-(IBAction)doneEditing:(id)sender ;
-(IBAction)startEditing:(id)sender;

-(void) initWithId:(id)userId;
-(void) initWithId:(id)userId withCompletionBlock:(void (^)(id))result;
-(void) initWithUser:(id)user withCompletionBlock:(void (^)(id))result;


-(void)setBarButtonsVisible:(BOOL)visible ;

@end
