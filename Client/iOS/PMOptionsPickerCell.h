//
//  PMOptionsPickerCell.h
//  weever
//
//  Created by Ilia Ridge on 4/11/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WEProtocols.h"


@interface PMOptionsPickerCell : UICollectionViewCell

@property (strong, nonatomic) UILabel *label;
@property (strong, nonatomic) id<OptionsPickerDelegate> delegate;
@property (strong, nonatomic) UIButton* actionButton;

-(void) setImage:(id)imageName;

@end
