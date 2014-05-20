//
//  IQFeedbackView.h
//  IQPhotoEditor
//
//  Created by Iftekhar on 06/10/13.
//  Copyright (c) 2013 Canopus. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "UIColor+UIColor_Additions.h"
#import "AViewController.h"
#import "DALinedTextView.h"
#import "PPPinPadViewController.h"
#import <AssetsLibrary/AssetsLibrary.h>
#import "WEImageEditorController.h"



#define IOS_7_OR_GREATER ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.0f)

typedef void(^IQFeedbackCompletion)(BOOL isCancel, NSString* message, UIImage* image, NSDictionary* returnValues);



@interface IQFeedbackView : UIView <PinPadPasswordProtocol>

@property(nonatomic, strong) WEImageEditorController* imageEditor;
@property(nonatomic, strong) ALAssetsLibrary* library;
@property(nonatomic, strong) UIImageView *blurredBackgroundView;
@property(nonatomic, strong) NSString* title;
@property(nonatomic, strong) NSString* message;
@property(nonatomic, strong) NSString* color;
@property(nonatomic, strong) UIImage* image;
@property(nonatomic, strong) NSString* recording;
@property(nonatomic, strong) NSString* pin;

@property(nonatomic) int controlType; // Message or Thread
@property(nonatomic) int contentType; // options, like private public etc.
@property(nonatomic, strong) NSArray* contentTypeColors;
@property(nonatomic, strong) NSArray* contentTypeLabels;

@property(nonatomic , strong) id TextViewFeedback;
@property(nonatomic , strong) AViewController* voiceControler;

@property(nonatomic , strong) UIButton* addImageButton;
@property(nonatomic , strong) UIButton* addVoiceButton;

//@property(nonatomic, strong) UISegmentedControl* segmentedControl;

@property(nonatomic, assign) BOOL canAddImage;							//Default YES.
@property(nonatomic, assign) BOOL canEditText;							//Default YES.

- (id)initWithTitle:(NSString *)title message:(NSString *)message image:(UIImage*)image cancelButtonTitle:(NSString *)cancelButtonTitle doneButtonTitle:(NSString *)doneButtonTitle;

-(void)showInViewController:(UIViewController*)controller completionHandler:(IQFeedbackCompletion)completionHandler;

-(void)dismiss;

@end
