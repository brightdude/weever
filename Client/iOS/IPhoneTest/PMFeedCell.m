//
//  PMFeedCell.m
//  ProxiMore
//
//  Created by Ilia Ridge on 3/15/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "PMFeedCell.h"
#import "UIColor+UIColor_Additions.h"
#define ARC4RANDOM_MAX      0x100000000


@implementation PMFeedCell

- (void)awakeFromNib
{
    // Initialization code
    
    self.nameLabel.textColor =  [UIColor pmMainColor];
    self.nameLabel.font =  [UIFont fontWithName:[UIFont pmTitleTextFont] size:14.0f];
    
    self.updateLabel.textColor =  [UIColor whiteColor];
    self.updateLabel.font =  [UIFont fontWithName:[UIFont pmTitleTextFont] size:14.0f];
    
    self.dateLabel.textColor = [UIColor pmNeutralColor];
    self.dateLabel.font =  [UIFont fontWithName:[UIFont pmTitleTextFont] size:11.0f];
    
    self.commentCountLabel.textColor = [UIColor pmNeutralColor];
    self.commentCountLabel.font =  [UIFont fontWithName:[UIFont pmTextFont] size:12.0f];
    self.commentCountView.image = [UIImage imageNamed:@"speech_bubble_filled-512.png" tintColor:[UIColor whiteColor] style:UIImageTintedStyleKeepingAlpha];

    
    self.likeCountLabel.textColor = [UIColor pmNeutralColor];
    self.likeCountLabel.font =  [UIFont fontWithName:[UIFont pmTextFont] size:12.0f];
    self.likeCountView.image = [UIImage imageNamed:@"group-512.png" tintColor:[UIColor whiteColor] style:UIImageTintedStyleKeepingAlpha];
    
    self.picImageView.layer.cornerRadius = 5.0f;
    self.picImageView.clipsToBounds = YES;
    
    self.picImageView.contentMode = UIViewContentModeScaleAspectFill;
    self.picImageView.clipsToBounds = YES;
    
    

    
}

-(void)setImage:(NSString*)imagename {
    
}

-(void) darken:(CGFloat)opacity withColor:(UIColor*)color {
    UIView* darkView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, self.imageView.frame.size.width, self.imageView.frame.size.height)];
    
    //UIView* darkView = [[UIView alloc] initWithFrame:self.imageView.frame];
    
    darkView.backgroundColor = color;
    darkView.alpha = opacity;
    [self.contentView addSubview:darkView];
    NSLog(@"Making the layer darker %i", [self.contentView.subviews count]);
// //   self.imageView.image = nil;
////   self.picImageView.ba
//    self.picImageView.layer.backgroundColor = [UIColor blackColor].CGColor;
//    self.picImageView.alpha = 0.2f;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated
{
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

@end
