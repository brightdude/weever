//
//  PMChannelHeaderView.h
//  ProxiMore
//
//  Created by Ilia Ridge on 3/17/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "UIImage+Additions.h"
#import "PMImageCache.h"


@interface PMChannelHeaderView : UIView

@property (nonatomic, strong) PMImageCache *pmCache;
@property (strong,nonatomic) NSDictionary* channel;

@property (strong,nonatomic) UILabel* title;
@property (strong,nonatomic) UILabel* count;
@property (strong,nonatomic) UILabel* content;
@property (strong,nonatomic) UIImageView* bg;

@property (strong,nonatomic) UILabel* members;
@property (strong,nonatomic) UILabel* posts;
@property (strong,nonatomic) UIImageView* kind;

-(void) setUpView:(id)channel andCompletionBlock:(void (^)(id))result;
-(UIImage*) asImage;

@end
