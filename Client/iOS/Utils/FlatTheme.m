//
//  FlatTheme.m
//  ADVFlatUI
//
//  Created by Tope on 05/06/2013.
//  Copyright (c) 2013 App Design Vault. All rights reserved.
//

#import "FlatTheme.h"
#import "Utils.h"

@implementation FlatTheme


+(void)styleNavigationBarWithFontName:(NSString*)navigationTitleFont andColor:(UIColor*)color{
    
    CGSize size = CGSizeMake(320, 44);
    
    UIGraphicsBeginImageContext(size);
    CGContextRef currentContext = UIGraphicsGetCurrentContext();
    CGRect fillRect = CGRectMake(0,0,size.width,size.height);
    CGContextSetFillColorWithColor(currentContext, color.CGColor);
    CGContextFillRect(currentContext, fillRect);
    
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    
    UINavigationBar* navAppearance = [UINavigationBar appearance];
    
    [navAppearance setBackgroundImage:image forBarMetrics:UIBarMetricsDefault];
    
    [navAppearance setTitleTextAttributes:[NSDictionary dictionaryWithObjectsAndKeys:
                                           [UIColor whiteColor], UITextAttributeTextColor,
                                           [UIFont fontWithName:navigationTitleFont size:18.0f], UITextAttributeFont,
                                           nil]];
    
}

+(void)styleSegmentedControlWithFontName:(NSString*)fontName andSelectedColor:(UIColor*)selectedColor andUnselectedColor:(UIColor*)unselectedColor andDidviderColor:(UIColor*)dividerColor{
    
    UIFont* font = [UIFont fontWithName:fontName size:13.0f];
    
    UIImage* segmentedBackground = [Utils drawImageOfSize:CGSizeMake(50, 30) andColor:unselectedColor];
    UIImage* segmentedSelectedBackground = [Utils drawImageOfSize:CGSizeMake(50, 30) andColor:selectedColor];
    UIImage* segmentedDividerImage = [Utils drawImageOfSize:CGSizeMake(1, 30) andColor:dividerColor];
    
    UISegmentedControl *segmentedAppearance = [UISegmentedControl appearance];
    [segmentedAppearance setBackgroundImage:segmentedBackground forState:UIControlStateNormal barMetrics:UIBarMetricsDefault];
    
    [segmentedAppearance setBackgroundImage:segmentedSelectedBackground forState:UIControlStateSelected barMetrics:UIBarMetricsDefault];
    
    [segmentedAppearance setDividerImage:segmentedDividerImage forLeftSegmentState:UIControlStateNormal rightSegmentState:UIControlStateNormal barMetrics:UIBarMetricsDefault];
    
    [segmentedAppearance setTitleTextAttributes:[NSDictionary dictionaryWithObjectsAndKeys:
                                                 [UIColor lightGrayColor], UITextAttributeTextColor,
                                                 font, UITextAttributeFont,[NSValue valueWithCGSize:CGSizeMake(0.0,0.0)], UITextAttributeTextShadowOffset,
                                                 nil] forState:UIControlStateNormal];
    
    [segmentedAppearance setTitleTextAttributes:[NSDictionary dictionaryWithObjectsAndKeys:
                                                 [UIColor whiteColor], UITextAttributeTextColor,
                                                 font, UITextAttributeFont, [NSValue valueWithCGSize:CGSizeMake(0.0,0.0)], UITextAttributeTextShadowOffset,
                                                 nil] forState:UIControlStateSelected];
    
}


@end
