//
//  UIColor+UIColor_Additions.h
//  ProxiMore
//
//  Created by Ilia Ridge on 3/16/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIColor (UIColor_Additions)

+(UIColor*)randomColor;
+(UIColor*)randomColor:(float)alpha;

+(UIColor *)colorWithHexString:(NSString *)hexString;
+(NSString *)hexValuesFromUIColor:(UIColor *)color;

+(UIColor*)  pmColorPink;
+(UIColor*)  pmColorRed;
+(UIColor*)  pmColorGreen;
+(UIColor*)  pmColorBlue;
+(UIColor*)  pmColorExtra;

+(UIColor*)  pmOnColor; // red same as Main ??
+(UIColor*)  pmOffColor; // Pinkish
+(UIColor*)  pmDividerColor; // Whiteish
+(UIColor*)  pmBackGroundColor; // Background white

+(UIColor*) pmNeutralColor; // Dark grey
+(UIColor*) pmNeutralLightColor; // Light Gret
+(UIColor*) pmMainColor; // Signature RED

@end

@interface UIFont (UI_Font_Additions)

+(NSString*) pmTextFont;
+(NSString*) pmItalicTextFont;
+(NSString*) pmTitleTextFont;
+(NSString*) pmControlTextFont;
+(NSString*) pmControlAlternateTextFont;

@end