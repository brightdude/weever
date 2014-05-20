//
//  PMOptionsPickerCell.m
//  weever
//
//  Created by Ilia Ridge on 4/11/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "PMOptionsPickerCell.h"
#import "UIColor+UIColor_Additions.h"
#import "UIImage+ImageEffects.h"
#import "UIImage+Additions.h"
#import "WEProtocols.h"

@implementation PMOptionsPickerCell



- (id)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        [self setBackgroundColor:[UIColor pmBackGroundColor]];
        self.actionButton = [UIButton buttonWithType:UIButtonTypeCustom];
        self.actionButton.frame = CGRectMake(40 , 40, self.frame.size.width * 0.5, self.frame.size.height * 0.5);
        [self.actionButton addTarget:self action:@selector(buttonAction:) forControlEvents:UIControlEventTouchUpInside];
        //[[self.actionButton layer] setCornerRadius:8.0f];
//        [[self layer] setBorderColor:[UIColor grayColor].CGColor];
//        [[self layer] setMasksToBounds:YES];
//        [[self layer] setBorderWidth:3.0f];
        
        [self addSubview:self.actionButton];
        NSLog(@"cell frame height %f,%f , %f , %f", frame.size.height , frame.size.width , frame.origin.x, frame.origin.y);
        
    }
    return self;
}

-(void) setImage:(id)imageName {
    [self.actionButton setImage:[UIImage imageNamed:imageName tintColor:[UIColor pmMainColor] style:UIImageTintedStyleKeepingAlpha]  forState:UIControlStateNormal];
}

-(void)buttonAction:(id)sender {
    
    [self.delegate onFinishedPickingOptions:[NSDictionary dictionaryWithObjectsAndKeys:[NSNumber numberWithInt:self.tag], @"option" , nil]];
}
/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect
{
    // Drawing code
}
*/

@end
