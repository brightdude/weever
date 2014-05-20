//
//  WEPersonFeedCell.h
//  weever
//
//  Created by Ilia Ridge on 4/15/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WEUser.h"
#import "UIImage+Additions.h"




@interface WEPersonFeedCell : UITableViewCell

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

@property(nonatomic, strong) UIViewController<PersonCommunicationProtocol>* delegate;

@property(nonatomic) BOOL isPeer;

-(void)setUser:(WEUser *)user isPeer:(BOOL)isPeer;



@end
