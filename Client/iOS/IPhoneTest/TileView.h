//
//  TileView.h
//  IPhoneTest
//
//  Created by Lovells on 13-8-27.
//  Copyright (c) 2013年 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface TileView : UIView

- (id)initWithTarget:(id)target action:(SEL)action;
- (void)setLabel:(id)labelText;

@property (nonatomic, retain) IBOutlet UILabel *titleLabel;
@property (readwrite,assign) id delegate;

@end
