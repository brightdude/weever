//
//  ViewController.h
//  RNFrostedSidebar
//
//  Created by Ryan Nystrom on 8/13/13.
//  Copyright (c) 2013 Ryan Nystrom. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RNFrostedSidebar.h"
#import "PMDelegates.h"
#import "PMConstants.h"
#import "PMFeedCell.h"
#import "UIScrollView+APParallaxHeader.h"
#import "PMCHannelViewController.h"
#import "IQFeedbackView.h"
#import "AFHTTPRequestOperationManager.h"
#import "PPPinPadViewController.h"
#import "PMProfileController.h"
#import "PMLoginController.h"
#import "UIView+Animation.h"
#import "UIViewController+REFrostedViewController.h"
#import "UIColor+UIColor_Additions.h"
#import "WEIntroController.h"
#import "WEIntroView.h"
#import "PMSettingsController.h"
#import "Utils.h"
#import "RCSwitchOnOff.h"
#import "FlatTheme.h"
#import "SORelativeDateTransformer.h"
#import "PMTextEditController.h"
#import "PMImageCache.h"
#import "PMPeopleViewController.h"
#import "PMMPCFramework.h"
#import "WEPersonFeedCell.h"

#import "AppDelegate.h"

@interface RootViewController : UIViewController <RNFrostedSidebarDelegate ,
                                                  UITableViewDataSource , UITableViewDelegate , ProcessDataDelegate,
                                                  PinPadPasswordProtocol, ContentCreateDelegate, PersonCommunicationProtocol>

@property (strong, nonatomic) NSMutableArray* channelItems;
@property (strong, nonatomic) NSArray* nearItems;
@property (strong, nonatomic) NSArray* uniqueItems;
@property (strong, nonatomic) NSArray* subscribedItems;
@property (strong, nonatomic) NSMutableArray* userItems;
@property (strong, nonatomic) UITableView* table;
@property (strong, nonatomic) UISegmentedControl* segmentedControl;

@property (nonatomic, strong) NSMutableIndexSet *optionIndices;
@property (nonatomic, strong) UILabel* titleLabel;

@property (nonatomic, strong) RNFrostedSidebar *callout;

@property (nonatomic, strong) PMImageCache *pmCache;

@property (nonatomic , strong) PMMPCFramework* mpcHandler;

@property (nonatomic) CGFloat previousScrollViewYOffset;
@property (nonatomic) int viewType;

-(void) onAddChannel:(id)sender;
-(void) onJoinPrivateChannel:(id)sender;
-(void) onShowUserProfile:(id)sender;
-(void) onShowUserSettings:(id)sender;
-(void) onShowNearbyUsers:(id)sender;
-(void) onShowLoginScreen:(id)sender;

@end
