//
//  MyRect.h
//  IPhoneTest
//
//  Created by Clovers on 13-8-28.
//  Copyright (c) 2013年 Luwei. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface MyRect : NSObject

@property (nonatomic) CGFloat x;
@property (nonatomic) CGFloat y;
@property (nonatomic) CGFloat width;
@property (nonatomic) CGFloat height;

- (MyRect *)initWithX:(CGFloat)x Y:(CGFloat)y width:(CGFloat)width height:(CGFloat)height;
- (MyRect *)initWithCGRect:(CGRect)rect;

- (CGRect)rect;
- (CGPoint)center;

@end
