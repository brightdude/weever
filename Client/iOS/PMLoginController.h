//
//  PMLoginController.h
//  weever
//
//  Created by Ilia Ridge on 4/5/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface PMLoginController : UIViewController <UITextFieldDelegate>

@property (nonatomic, weak) IBOutlet UITextField * usernameField;

@property (nonatomic, weak) IBOutlet UITextField * passwordField;

@property (nonatomic, weak) IBOutlet UIView * elementContainer;

@property (nonatomic, weak) IBOutlet UIButton *loginButton;

@property (nonatomic, weak) IBOutlet UIButton * forgotButton;

@property (nonatomic, weak) IBOutlet UIImageView* iconImageView;

@property (nonatomic, weak) IBOutlet UIView* iconImageContainer;

@property (nonatomic, weak) IBOutlet UIScrollView* scrollView;


@end
