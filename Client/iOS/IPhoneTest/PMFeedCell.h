//
//  PMFeedCell.h
//  ProxiMore
//
//  Created by Ilia Ridge on 3/15/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "UIImage+Additions.h"
#import "WEProtocols.h"
#import "PMDelegates.h"

@interface PMFeedCell : UITableViewCell <ProcessDataDelegate>

@property (strong,nonatomic) id <ProcessDataDelegate> delegate;
@property (strong,nonatomic) id cellId;
@property (strong,nonatomic) NSDictionary* channel;

/* outlets */
@property (strong,nonatomic) IBOutlet UIImageView* avatarButton;
@property (strong,nonatomic) IBOutlet UILabel* nameLabel;
@property (strong,nonatomic) IBOutlet UILabel* updateLabel;
@property (strong,nonatomic) IBOutlet UILabel* dateLabel;
@property (strong,nonatomic) IBOutlet UILabel* likeCountLabel;
@property (strong,nonatomic) IBOutlet UIImageView* likeCountView;
@property (strong,nonatomic) IBOutlet UILabel* commentCountLabel;
@property (strong,nonatomic) IBOutlet UIImageView* commentCountView;
@property (strong,nonatomic) IBOutlet UIImageView* picImageView;

-(void) setRandomGBColor;
-(void) darken:(CGFloat)opacity withColor:(UIColor*)color;

@end
