//
//  UIAlertView+Additions.h
//  weever
//
//  Created by Ilia Ridge on 4/17/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <Foundation/Foundation.h>

#define kUIButtonBlockTouchUpInside @"TouchInside"

@interface UIWindow (PazLabs)

- (UIViewController *)visibleViewController;

+ (UIViewController *) getVisibleViewControllerFrom:(UIViewController *) vc;

@end

@interface UIAlertView (Additions)

- (void)showWithCompletion:(void(^)(UIAlertView *alertView, NSInteger buttonIndex))completion;

@end

@interface UIButton (Block)

@property (nonatomic, strong) NSMutableDictionary *actions;

- (void) setAction:(NSString*)action withBlock:(void(^)())block;

@end