//
//  WECustomActivity.h
//  weever
//
//  Created by Ilia Ridge on 4/18/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WEProtocols.h"

@interface WECustomActivity : UIActivity

@property (nonatomic,strong) NSString* image;
@property (nonatomic,strong) NSString* title;
@property (nonatomic,strong) NSString* type;
@property (strong,nonatomic) performBlock block;

+(WECustomActivity*)withImageName:(NSString*)imageName andTitle:(NSString*)imageTitle andBlock:(performBlock)imageBlock;

@end
