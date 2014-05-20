//
//  GHWalkThroughView.h
//  GHWalkThrough
//
//  Created by Tapasya on 21/01/14.
//  Copyright (c) 2014 Tapasya. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WEIntroPageCell.h"

typedef NS_ENUM(NSInteger, GHWalkThroughViewDirection) {
    GHWalkThroughViewDirectionVertical,
    GHWalkThroughViewDirectionHorizontal
};

@protocol WEIntroDelegate;
@protocol WEIntroDataSource;

@interface WEIntroView : UIView

@property (nonatomic, assign) id<WEIntroDelegate> delegate;

@property (nonatomic, assign) id<WEIntroDataSource> dataSource;

@property (nonatomic, assign) GHWalkThroughViewDirection walkThroughDirection;

@property (nonatomic, strong) UIView* floatingHeaderView;

@property (nonatomic, assign) BOOL isfixedBackground;

@property (nonatomic, strong) UIImage* bgImage;

@property (nonatomic, copy) NSString *closeTitle;

- (void) showInView:(UIView*) view animateDuration:(CGFloat) duration;

@end

@protocol WEIntroDelegate <NSObject>

@optional
- (void)walkthroughDidDismissView:(WEIntroView *)walkthroughView;

@end

@protocol WEIntroDataSource <NSObject>

@required

-(NSInteger) numberOfPages;

@optional
//-(UIView*) customViewForPage:(NSInteger) index;
- (UIImage*) bgImageforPage:(NSInteger) index;
-(void) configurePage:(WEIntroPageCell*) cell atIndex:(NSInteger) index;

@end
