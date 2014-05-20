//
//  UIColor+UIColor_Additions.m
//  ProxiMore
//
//  Created by Ilia Ridge on 3/16/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "UIColor+UIColor_Additions.h"

#define ARC4RANDOM_MAX      0x100000000

@implementation UIFont (UI_Font_Additions)

+(NSString*) pmTextFont {
    return @"GillSans-Italic";
}

+(NSString*) pmItalicTextFont {
    return @"GillSans-Italic";
}

+(NSString*) pmTitleTextFont {
    return @"GillSans-Bold";
}

+(NSString*) pmControlTextFont {
    return @"Avenir-Black";
}

+(NSString*) pmControlAlternateTextFont {
    return @"Avenir-Book";
}


@end

@implementation UIColor (UIColor_Additions)

+(UIColor*)randomColor {
   
    return [UIColor randomColor:0.7f];;
    
}

+(UIColor*)randomColor:(float)alpha {
    
    double red = ((double)arc4random() / ARC4RANDOM_MAX);
    double green = ((double)arc4random() / ARC4RANDOM_MAX);
    double blue = ((double)arc4random() / ARC4RANDOM_MAX);
    
    return [UIColor colorWithRed:red green:green blue:blue alpha:alpha];;
    
}

+(UIColor *)colorWithHexString:(NSString *)hexString {
    
    if ([hexString length] != 6) {
        return nil;
    }
    
    // Brutal and not-very elegant test for non hex-numeric characters
    NSRegularExpression *regex = [NSRegularExpression regularExpressionWithPattern:@"[^a-fA-F|0-9]" options:0 error:NULL];
    NSUInteger match = [regex numberOfMatchesInString:hexString options:NSMatchingReportCompletion range:NSMakeRange(0, [hexString length])];
    
    if (match != 0) {
        return nil;
    }
    
    NSRange rRange = NSMakeRange(0, 2);
    NSString *rComponent = [hexString substringWithRange:rRange];
    NSUInteger rVal = 0;
    NSScanner *rScanner = [NSScanner scannerWithString:rComponent];
    [rScanner scanHexInt:&rVal];
    float rRetVal = (float)rVal / 254;
    
    
    NSRange gRange = NSMakeRange(2, 2);
    NSString *gComponent = [hexString substringWithRange:gRange];
    NSUInteger gVal = 0;
    NSScanner *gScanner = [NSScanner scannerWithString:gComponent];
    [gScanner scanHexInt:&gVal];
    float gRetVal = (float)gVal / 254;
    
    NSRange bRange = NSMakeRange(4, 2);
    NSString *bComponent = [hexString substringWithRange:bRange];
    NSUInteger bVal = 0;
    NSScanner *bScanner = [NSScanner scannerWithString:bComponent];
    [bScanner scanHexInt:&bVal];
    float bRetVal = (float)bVal / 254;
    
    return [UIColor colorWithRed:rRetVal green:gRetVal blue:bRetVal alpha:1.0f];
    
}

+(NSString *)hexValuesFromUIColor:(UIColor *)color {
    
    if (!color) {
        return nil;
    }
    
    if (color == [UIColor whiteColor]) {
        // Special case, as white doesn't fall into the RGB color space
        return @"ffffff";
    }
    
    CGFloat red;
    CGFloat blue;
    CGFloat green;
    CGFloat alpha;
    
    [color getRed:&red green:&green blue:&blue alpha:&alpha];
    
    int redDec = (int)(red * 255);
    int greenDec = (int)(green * 255);
    int blueDec = (int)(blue * 255);
    
    NSString *returnString = [NSString stringWithFormat:@"%02x%02x%02x", (unsigned int)redDec, (unsigned int)greenDec, (unsigned int)blueDec];
    
    return returnString;
    
}

/*
 
 Regular Text  NSString* fontName = @"GillSans-Italic";
 Header/Title  NSString* boldFontName = @"GillSans-Bold";
 
 NSString* fontName = @"Avenir-Book";
 
 Segmented control font    NSString* boldFontName = @"Avenir-Black";
 *
 */


+(UIColor*) pmNeutralColor {
    return [UIColor colorWithWhite:0.7 alpha:1.0];
}

+(UIColor*) pmNeutralLightColor {
    return [UIColor colorWithWhite:0.4 alpha:1.0];
}


+(UIColor*) pmMainColor {
     return [UIColor colorWithRed:222.0/255 green:59.0/255 blue:47.0/255 alpha:1.0f];
}

+(UIColor*) pmBackGroundColor {
    return [UIColor colorWithWhite:0.9 alpha:1.0];
}

+(UIColor*)  pmColorPink
{
    return  [UIColor colorWithRed:240/255.f green:159/255.f blue:254/255.f alpha:1];
};
+(UIColor*)  pmColorRed {
    return [UIColor colorWithRed:255/255.f green:137/255.f blue:167/255.f alpha:1];
};
+(UIColor*)  pmColorGreen {
  return [UIColor colorWithRed:126/255.f green:242/255.f blue:195/255.f alpha:1];
}

+(UIColor*)  pmColorBlue {
 return [UIColor colorWithRed:119/255.f green:152/255.f blue:255/255.f alpha:1];
}

+(UIColor*)  pmColorExtra {
     return [UIColor colorWithRed:119/255.f green:152/255.f blue:255/255.f alpha:1];
}

+(UIColor*)  pmOnColor {
    return [UIColor colorWithRed:222.0/255 green:59.0/255 blue:47.0/255 alpha:1.0f];
}

+(UIColor*)  pmOffColor {
    return [UIColor colorWithRed:242.0/255 green:228.0/255 blue:227.0/255 alpha:1.0];
}

+(UIColor*)  pmDividerColor {
    return [UIColor whiteColor];
}


@end
