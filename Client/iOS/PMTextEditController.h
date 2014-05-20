//
//  PMTextEditController.h
//  weever
//
//  Created by Ilia Ridge on 4/8/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AViewController.h"
#import "DALinedTextView.h"
#import "PPPinPadViewController.h"
#import <AssetsLibrary/AssetsLibrary.h>
#import "WEImageEditorController.h"
#import "PMOptionsPickerController.h"



@interface PMTextEditController : UIViewController <PinPadPasswordProtocol,AVRecorderDelegate,UIImagePickerControllerDelegate,OptionsPickerDelegate>

@property (nonatomic , strong) id<ContentCreateDelegate> delegate;
@property (nonatomic , strong) AViewController* voiceControler;
@property (nonatomic , strong) PMOptionsPickerController* options;
@property (nonatomic , strong) IBOutlet UIImageView* imageView;
@property (nonatomic , strong) IBOutlet UITextView*  textView;
@property (nonatomic , strong) IBOutlet UIButton* doneButton;
@property (nonatomic , strong) IBOutlet UIButton* createButton;
@property (nonatomic , strong) IBOutlet UIButton* photoButton;
@property (nonatomic , strong) IBOutlet UIButton* voiceButton;
@property (nonatomic , strong) IBOutlet UIButton* titleButton;

@property(nonatomic) int controlType; // Message or Thread
@property(nonatomic) int contentType; // options, like private public etc.
@property(nonatomic, strong) NSArray* contentOptions;
@property(nonatomic, strong) NSArray* contentTypeColors;
@property(nonatomic, strong) NSArray* contentTypeLabels;
@property(nonatomic, strong) NSString* pin;
@property(nonatomic, strong) NSString* recording;
@property(nonatomic, strong) NSString* fileUrl;


-(IBAction) onDismiss:(id)sender;


@end
