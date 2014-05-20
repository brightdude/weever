//
//  FlatTheme.h
//  ADVFlatUI
//
//  Created by Tope on 05/06/2013.
//  Copyright (c) 2013 App Design Vault. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface FlatTheme : NSObject


+(void)styleNavigationBarWithFontName:(NSString*)navigationTitleFont andColor:(UIColor*)color;

+(void)styleSegmentedControlWithFontName:(NSString*)fontName andSelectedColor:(UIColor*)selectedColor andUnselectedColor:(UIColor*)unselectedColor andDidviderColor:(UIColor*)dividerColor;
    
@property (nonatomic, strong) UIImage* switchOnBackground;
@property (nonatomic, strong) UIImage* switchOffBackground;
@property (nonatomic, strong) UIImage* switchThumb;
@property (nonatomic, strong) UIFont* switchFont;
@property (nonatomic, strong) UIColor* switchTextOnColor;
@property (nonatomic, strong) UIColor* switchTextOffColor;

@end
