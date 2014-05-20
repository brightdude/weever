//
//  IQFeedbackView.m
//  IQPhotoEditor
//
//  Created by Iftekhar on 06/10/13.
//  Copyright (c) 2013 Canopus. All rights reserved.
//

#import "IQFeedbackView.h"
#import <QuartzCore/QuartzCore.h>

#import "UIImage+ImageEffects.h"
#import "UIImage+Additions.h"
#import "PMDelegates.h"

#define M_PI   3.14159265358979323846264338327950288

@interface IQFeedbackView ()<UIImagePickerControllerDelegate, UINavigationControllerDelegate, AVRecorderDelegate>


@end

@implementation IQFeedbackView
{
	UIImage *defaultImage;
	IQFeedbackCompletion _completionHandler;
	UIViewController *_currentController;
	
	UIView *backgroundView;
	
	UINavigationBar *navigationBar;
    
	
	UIButton *buttonImageAttached;
    
    CGFloat keyboardHeight;
    
    UISegmentedControl* segmentedControl;

}

@synthesize message = _message;
@synthesize image = _image;


- (id)initWithTitle:(NSString *)title message:(NSString *)message image:(UIImage*)image cancelButtonTitle:(NSString *)cancelButtonTitle doneButtonTitle:(NSString *)doneButtonTitle
{
	self = [self init];
	
	if (self)
	{
		UINavigationItem *navigationItem = [[UINavigationItem alloc] initWithTitle:title];
		
		if ([doneButtonTitle length])
		{
			UIBarButtonItem *doneButton = [[UIBarButtonItem alloc] initWithTitle:doneButtonTitle style:UIBarButtonItemStyleDone target:self action:@selector(doneButtonClicked:)];
            if(!IOS_7_OR_GREATER)
                [doneButton setTitleTextAttributes:[NSDictionary dictionaryWithObjectsAndKeys:
                                          [UIFont boldSystemFontOfSize:0],UITextAttributeFont,
                                          [UIColor darkGrayColor],UITextAttributeTextColor,
                                          [UIColor blackColor],UITextAttributeTextShadowColor,
                                          [NSValue valueWithUIOffset:UIOffsetMake(-1, -1)],UITextAttributeTextShadowOffset,
                                          nil] forState:UIControlStateNormal];

            
			[navigationItem setRightBarButtonItem:doneButton animated:YES];
		}
		
		if ([cancelButtonTitle length])
		{
			UIBarButtonItem *cancelButton = [[UIBarButtonItem alloc] initWithTitle:cancelButtonTitle style:UIBarButtonItemStyleBordered target:self action:@selector(cancelButtonClicked:)];
            if(!IOS_7_OR_GREATER)
                [cancelButton setTitleTextAttributes:[NSDictionary dictionaryWithObjectsAndKeys:
                                                [UIFont boldSystemFontOfSize:0],UITextAttributeFont,
                                                [UIColor darkGrayColor],UITextAttributeTextColor,
                                                [UIColor blackColor],UITextAttributeTextShadowColor,
                                                [NSValue valueWithUIOffset:UIOffsetMake(-1, -1)],UITextAttributeTextShadowOffset,
                                                nil] forState:UIControlStateNormal];
			[navigationItem setLeftBarButtonItem:cancelButton animated:YES];
		}
		
		[navigationBar setItems:[NSArray arrayWithObject:navigationItem]];
		
		[self setTitle:title];
		[self setMessage:message];
	}
	return self;
}

-(id)initWithFrame:(CGRect)frame
{
    NSLog (@"WITH FRAME");
    
    self = [super initWithFrame:frame];
    if (self) {
		[self setFrame:CGRectMake(10, -204, 300, 204)];
		[self setAutoresizingMask:(UIViewAutoresizingFlexibleWidth|UIViewAutoresizingFlexibleHeight|UIViewAutoresizingFlexibleBottomMargin|UIViewAutoresizingFlexibleTopMargin)];
		[self.layer setCornerRadius:7.0];
		[self setClipsToBounds:YES];
        
        defaultImage = [UIImage imageNamed:@"addImage"];
		
		navigationBar = [[UINavigationBar alloc] initWithFrame:CGRectMake(0, 0, self.frame.size.width, 44)];
        
        if(IOS_7_OR_GREATER){
            self.blurredBackgroundView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, self.frame.size.width, [[UIScreen mainScreen] bounds].size.height)];
            self.blurredBackgroundView.image = [self blurredSnapshot];
            [self addSubview: self.blurredBackgroundView];
            
            
            UIInterpolatingMotionEffect *interpolationHorizontal = [[UIInterpolatingMotionEffect alloc]initWithKeyPath:@"center.x" type:UIInterpolatingMotionEffectTypeTiltAlongHorizontalAxis];
            interpolationHorizontal.minimumRelativeValue = @-7.0;
            interpolationHorizontal.maximumRelativeValue = @7.0;
            
            UIInterpolatingMotionEffect *interpolationVertical = [[UIInterpolatingMotionEffect alloc]initWithKeyPath:@"center.y" type:UIInterpolatingMotionEffectTypeTiltAlongVerticalAxis];
            interpolationVertical.minimumRelativeValue = @-7.0;
            interpolationVertical.maximumRelativeValue = @7.0;
            
            [self addMotionEffect:interpolationHorizontal];
            [self addMotionEffect:interpolationVertical];
            
        }
        else{
            [self setBackgroundColor:[UIColor whiteColor]];
            
            [navigationBar setTintColor:[UIColor whiteColor]];
            [navigationBar setTitleTextAttributes:[NSDictionary dictionaryWithObjectsAndKeys:
                                                   [UIFont boldSystemFontOfSize:0],UITextAttributeFont,
                                                   [UIColor darkGrayColor],UITextAttributeTextColor,
                                                   [UIColor blackColor],UITextAttributeTextShadowColor,
                                                   [NSValue valueWithUIOffset:UIOffsetMake(-1, -2)],UITextAttributeTextShadowOffset,
                                                   nil]];
        }
		
        if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone)     keyboardHeight = 216;
        else if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPad)  keyboardHeight = 264;
    

		[navigationBar setAutoresizingMask:(UIViewAutoresizingFlexibleWidth)];
		[self addSubview:navigationBar];

        
        if(!IOS_7_OR_GREATER){
            self.TextViewFeedback = [[DALinedTextView alloc] initWithFrame:CGRectMake(5, 49, 232, 120)];
            
        }
        else{
            self.TextViewFeedback = [[UITextView alloc] initWithFrame:CGRectMake(5, 49, 232, 120)];
            ((UITextView *)self.TextViewFeedback).backgroundColor = [UIColor clearColor];
        }
        
        [self.TextViewFeedback setTextAlignment:NSTextAlignmentCenter];
		[self.TextViewFeedback setDataDetectorTypes:(UIDataDetectorTypePhoneNumber|UIDataDetectorTypeLink)];
		[self.TextViewFeedback setAutoresizingMask:(UIViewAutoresizingFlexibleWidth|UIViewAutoresizingFlexibleHeight)];
		[self.TextViewFeedback setAutocorrectionType:UITextAutocorrectionTypeYes];
		[self.TextViewFeedback setKeyboardAppearance:UIKeyboardAppearanceAlert];
		[self.TextViewFeedback setFont:[UIFont systemFontOfSize:17.0]];
		[self addSubview:self.TextViewFeedback];
        
        //[self.TextViewFeedback setBackgroundColor:[UIColor redColor]];

		buttonImageAttached = [[UIButton alloc] initWithFrame:CGRectMake(215, 49, 80, 80)];
		[buttonImageAttached setAutoresizingMask:(UIViewAutoresizingFlexibleLeftMargin)];
        [buttonImageAttached.layer setShadowColor:[UIColor blackColor].CGColor];
        [buttonImageAttached.layer setShadowOffset:CGSizeMake(-1, -3)];
        [buttonImageAttached.layer setShadowOpacity:1];
        [buttonImageAttached.layer setShadowRadius:2];
		[buttonImageAttached setImage:defaultImage forState:UIControlStateNormal];
		[buttonImageAttached.imageView setContentMode:UIViewContentModeScaleAspectFit];
		[buttonImageAttached addTarget:self action:@selector(buttonImageClicked:) forControlEvents:UIControlEventTouchUpInside];
		//[self addSubview:buttonImageAttached];
        
		
		backgroundView = [[UIView alloc] initWithFrame:[[UIApplication sharedApplication] keyWindow].bounds];
		[backgroundView setAutoresizingMask:(UIViewAutoresizingFlexibleHeight|UIViewAutoresizingFlexibleWidth)];

		[backgroundView setBackgroundColor:[UIColor clearColor]];
        
        self.addImageButton = [UIButton buttonWithType:UIButtonTypeCustom];
        [self.addImageButton setImage:[UIImage imageNamed:@"slr_camera-512" tintColor:[UIColor grayColor] style:UIImageTintedStyleKeepingAlpha] forState:UIControlStateNormal];
        self.addImageButton.frame = CGRectMake(15,15 + ((UIView*)self.TextViewFeedback).frame.origin.y + ((UIView*)self.TextViewFeedback).frame.size.height ,32,32);
        [self.addImageButton addTarget:self action:@selector(buttonImageClicked:) forControlEvents:UIControlEventTouchUpInside];
        [self addSubview:self.addImageButton];
        
        self.addVoiceButton = [UIButton buttonWithType:UIButtonTypeCustom];
        [self.addVoiceButton setImage:[UIImage imageNamed:@"micro-512" tintColor:[UIColor grayColor] style:UIImageTintedStyleKeepingAlpha]  forState:UIControlStateNormal];
        self.addVoiceButton.frame = CGRectMake(60,15 + ((UIView*)self.TextViewFeedback).frame.origin.y + ((UIView*)self.TextViewFeedback).frame.size.height,32,32);
        [self.addVoiceButton addTarget:self action:@selector(buttonVoiceClicked:) forControlEvents:UIControlEventTouchUpInside];
        
        [self addSubview:self.addVoiceButton];
        
        
        UIColor* randomColor = [UIColor randomColor:1.0f];
        self.color = [UIColor hexValuesFromUIColor:randomColor];
        [self setBackgroundColor:randomColor];
        
        
        UISwipeGestureRecognizer* recognizerLeft = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(handleSwipeLeft:)];
        [recognizerLeft setDirection:(UISwipeGestureRecognizerDirectionLeft)];
        [self addGestureRecognizer:recognizerLeft];
        
        UISwipeGestureRecognizer* recognizerRight = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(handleSwipeRight:)];
        [recognizerRight setDirection:(UISwipeGestureRecognizerDirectionRight)];
        [self addGestureRecognizer:recognizerRight];
        
        self.contentTypeColors = [NSArray arrayWithObjects:[UIColor greenColor], [UIColor yellowColor], [UIColor redColor], nil];
        
        self.contentType = 0; // first option regardless of conreol for now
        
        [navigationBar setBackgroundColor:[self.contentTypeColors objectAtIndex:self.contentType]];
        
		[backgroundView addSubview:self];
		
		[self setCanAddImage:YES];
		[self setCanEditText:YES];
        
    }
    return self;
}

-(void)setControlType:(int)ctype {
    _controlType = ctype;
    
    if (ctype == 0) {
        self.contentTypeLabels = [NSArray arrayWithObjects:@"Open",@"Public",@"Private", nil];
    }
    else {
        self.contentTypeLabels = [NSArray arrayWithObjects:@"Low",@"Normal",@"High", nil];
    }

    if (self.contentTypeLabels) {
            [self setTitle:[self.contentTypeLabels objectAtIndex:self.contentType]];
    }

    if (self.contentTypeColors) {
        [navigationBar setBackgroundColor:[self.contentTypeColors objectAtIndex:self.contentType]];
    }

}

-(IBAction)SegmentValueChanged:(UISegmentedControl *)SControl
{
    if (SControl.selectedSegmentIndex==0)
    {
    }
    else if (SControl.selectedSegmentIndex==1)
    {

    }
    else if (SControl.selectedSegmentIndex==2)
    {
        if (self.controlType == 1) {

        }
        
    }
    
}


-(void) handleSwipeLeft:(UISwipeGestureRecognizer*)_recognizer {
    

        NSLog(@"Swipe Left detected");

        UIColor* randomColor = [UIColor randomColor:1.0f];
        
        self.color = [UIColor hexValuesFromUIColor:randomColor];
        [self setBackgroundColor:randomColor];

}

-(void) handleSwipeRight:(UISwipeGestureRecognizer*)_recognizer {
        NSLog(@"Swipe Right detected");
    
    self.contentType += 1;
    
    if (self.contentTypeColors) {
        if (self.contentType > ([self.contentTypeColors count] - 1)) {
            self.contentType = 0;
        }
        
        [navigationBar setBackgroundColor:[self.contentTypeColors objectAtIndex:self.contentType]];
    }
    
    if (self.contentTypeLabels) {
        if (self.contentType > ([self.contentTypeLabels count] - 1)) {
            self.contentType = 0;
        }
        
        [self setTitle:[self.contentTypeLabels objectAtIndex:self.contentType]];
    }
    
}


-(void)setTitle:(NSString *)title
{
	_title = title;
	
	[navigationBar.topItem setTitle:title];
    
    
    /*
    if ([title rangeOfString:@"Post"].location == NSNotFound)
        self.controlType = 0;
    else
        self.controlType = 1;
    
    
    if (self.controlType == 0) {
        
        segmentedControl = [[UISegmentedControl alloc] initWithItems:[NSArray arrayWithObjects:
                                                                      [UIImage imageNamed:@"edit_user-512-rotated" tintColor:[UIColor whiteColor] style:UIImageTintedStyleKeepingAlpha],
                                                                      [UIImage imageNamed:@"group-512-rotated" tintColor:[UIColor whiteColor] style:UIImageTintedStyleKeepingAlpha],
                                                                      
                                                                      [UIImage imageNamed:@"lock_filled-512-rotated" tintColor:[UIColor whiteColor] style:UIImageTintedStyleKeepingAlpha], nil]];
    }
    
    if (self.controlType == 1) {
        
        segmentedControl = [[UISegmentedControl alloc] initWithItems:[NSArray arrayWithObjects:
                                                                      [UIImage imageNamed:@"pen-512-rotated" tintColor:[UIColor whiteColor] style:UIImageTintedStyleKeepingAlpha],
                                                                      [UIImage imageNamed:@"photo-512-rotated" tintColor:[UIColor whiteColor] style:UIImageTintedStyleKeepingAlpha],
                                                                      [UIImage imageNamed:@"voice_recognition_scan-512-rotated" tintColor:[UIColor whiteColor] style:UIImageTintedStyleKeepingAlpha], nil]];
    }
    */
    
    /* UISegmentedControlStylePlain,
     UISegmentedControlStyleBordered,
     UISegmentedControlStyleBar,
     UISegmentedControlStyleBezeled, */
    
    /*
    segmentedControl.tintColor = [UIColor grayColor];
    
    segmentedControl.frame = CGRectMake(168, 106, 181, 58);
    //segmentedControl.segmentedControlStyle = UISegmentedControlStylePlain;
    segmentedControl.selectedSegmentIndex = 0;
    segmentedControl.transform = CGAffineTransformRotate(segmentedControl.transform, 90.0/180*M_PI);
    segmentedControl.segmentedControlStyle = UISegmentedControlStyleBordered;
    [segmentedControl addTarget:self action:@selector(SegmentValueChanged:) forControlEvents:UIControlEventValueChanged];
    
    [self addSubview:segmentedControl]; */

}

-(void)setMessage:(NSString *)message
{
	_message = message;
	
	[self.TextViewFeedback setText:message];
	
	if (_canEditText == NO)
	{
//		[_currentController];
	}
	
}

-(NSString *)message
{
	return ((UITextView *)self.TextViewFeedback).text;
}

-(void)setImage:(UIImage *)image
{
	_image = image;
	
	if (_image == nil)	[buttonImageAttached setImage:defaultImage forState:UIControlStateNormal];
	else				[buttonImageAttached setImage:_image forState:UIControlStateNormal];
    
    UIGraphicsBeginImageContext(self.blurredBackgroundView.frame.size);
    [_image drawInRect:CGRectMake(0, 0, self.blurredBackgroundView.frame.size.width, self.blurredBackgroundView.frame.size.height)];
    UIImage *newImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
//    self.blurredBackgroundView.image = newImage;

}

-(UIImage *)image
{
	if (buttonImageAttached.currentImage == nil || [buttonImageAttached.currentImage isEqual:defaultImage])
	{
		return nil;
	}
	else
	{
		return buttonImageAttached.currentImage;
	}
}

-(void)setCanAddImage:(BOOL)canAddImage
{
	_canAddImage = canAddImage;
    
	CGRect textFrame = ((UITextView *) self.TextViewFeedback).frame;
	
	if (_canAddImage == YES)
	{
        
		//[self.TextViewFeedback setFrame:CGRectMake(textFrame.origin.x, textFrame.origin.y, 205, textFrame.size.height)];
		[buttonImageAttached setHidden:NO];
	}
	else
	{
		//[self.TextViewFeedback setFrame:CGRectMake(textFrame.origin.x, textFrame.origin.y, 290, textFrame.size.height)];
		[buttonImageAttached setHidden:YES];
	}
}

-(void)setCanEditText:(BOOL)canEditText
{
	_canEditText = canEditText;
	
    //if(!IOS_7_OR_GREATER)
        [self.TextViewFeedback setEditable:_canEditText];
}


-(void)buttonImageClicked:(UIButton*)button
{
    [backgroundView removeFromSuperview];
    
    UIImagePickerController *picker = [[UIImagePickerController alloc] init];
    
    picker.allowsEditing = NO;
    picker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
    picker.delegate = self;
    //self.window.rootViewController = picker;
    
    ALAssetsLibrary *library = [[ALAssetsLibrary alloc] init];
    self.imageEditor = [[WEImageEditorController alloc] initWithNibName:@"WEImageEditorController" bundle:nil];
    self.imageEditor.checkBounds = YES;
    self.imageEditor.rotateEnabled = YES;
    self.library = library;
    
    self.imageEditor.doneCallback = ^(UIImage *editedImage, BOOL canceled){
        if(!canceled) {
            /*
            [library writeImageToSavedPhotosAlbum:[editedImage CGImage]
             
                                      orientation:(ALAssetOrientation)editedImage.imageOrientation
                                      completionBlock:^(NSURL *assetURL, NSError *error){
                                      if (error) {
                                          UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Error Saving"
                                                                                          message:[error localizedDescription]
                                                                                         delegate:nil
                                                                                cancelButtonTitle:@"Ok"
                                                                                otherButtonTitles: nil];
                                          [alert show];
                                      }
                                  }]; */

                    [self.addImageButton setImage:[UIImage imageNamed:@"slr_camera-512" tintColor:[UIColor greenColor] style:UIImageTintedStyleKeepingAlpha] forState:UIControlStateNormal];
                    
                    [self setImage:editedImage];

            
                    [picker dismissViewControllerAnimated:YES completion:^{
                        
                        [[[UIApplication sharedApplication] keyWindow] addSubview:backgroundView];
                        
                        [self.TextViewFeedback becomeFirstResponder];
                    }];
            

            
        }
        [picker popToRootViewControllerAnimated:YES];
        [picker setNavigationBarHidden:NO animated:YES];
    };
    
    [_currentController presentViewController:picker animated:YES completion:nil];
    
    /*
	UIImagePickerController *controller = [[UIImagePickerController alloc] init];
	[controller setDelegate:self];
	[_currentController presentViewController:controller animated:YES completion:nil]; */
    
    
    /*
     
     
     */
    
    
}

-(void) imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info
{
    UIImage *image =  [info objectForKey:UIImagePickerControllerOriginalImage];
    NSURL *assetURL = [info objectForKey:UIImagePickerControllerReferenceURL];
    
    [self.library assetForURL:assetURL resultBlock:^(ALAsset *asset) {
        UIImage *preview = [UIImage imageWithCGImage:[asset aspectRatioThumbnail]];
        
        self.imageEditor.sourceImage = image;
        self.imageEditor.previewImage = preview;
        [self.imageEditor reset:NO];
        
        
        [picker pushViewController:self.imageEditor animated:YES];
        [picker setNavigationBarHidden:YES animated:NO];
        
    } failureBlock:^(NSError *error) {
        NSLog(@"Failed to get asset from library");
    }];
}

- (void) imagePickerControllerDidCancel:(UIImagePickerController *)picker
{
	[picker dismissViewControllerAnimated:YES completion:^{
        
        [[[UIApplication sharedApplication] keyWindow] addSubview:backgroundView];
        
		[self.TextViewFeedback becomeFirstResponder];
	}];
}


-(void)buttonVoiceClicked:(UIButton*)button
{
    [backgroundView removeFromSuperview];
    
    
 //   self.voiceControler =  [[AViewController alloc] initWithRect:((UITextView*)self.TextViewFeedback).frame];
    self.voiceControler =  [[AViewController alloc] init];
    
    UIWindow* keyWindow= [[UIApplication sharedApplication] keyWindow];
    [keyWindow addSubview: self.voiceControler.view];
    
    
    //[self addSubview:self.voiceControler.view];
    [self.TextViewFeedback resignFirstResponder];
	[self.voiceControler setDelegate:self];
    
    
    
	[_currentController presentViewController:self.voiceControler animated:YES completion:nil];
    
}

- (void)voiceRecordingController:(AViewController *)recorder didFinishRecording:(NSString *)filePath  {

    if (filePath) {
        
        [self.addVoiceButton setImage:[UIImage imageNamed:@"micro-512" tintColor:[UIColor greenColor] style:UIImageTintedStyleKeepingAlpha] forState:UIControlStateNormal];
        
        [self setRecording:filePath];
    }
    else {
        [self setRecording:@""];
    }
        

    [recorder dismissViewControllerAnimated:YES completion:^{
        
        [[[UIApplication sharedApplication] keyWindow] addSubview:backgroundView];
        
		[self.TextViewFeedback becomeFirstResponder];
	}];

}


/*
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingImage:(UIImage *)image editingInfo:(NSDictionary *)editingInfo
{
    [self.addImageButton setImage:[UIImage imageNamed:@"slr_camera-512" tintColor:[UIColor greenColor] style:UIImageTintedStyleKeepingAlpha] forState:UIControlStateNormal];
    
	[self setImage:image];
    
	[picker dismissViewControllerAnimated:YES completion:^{
        
        [[[UIApplication sharedApplication] keyWindow] addSubview:backgroundView];
        
		[self.TextViewFeedback becomeFirstResponder];
	}];
    

}

- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker
{
	[picker dismissViewControllerAnimated:YES completion:^{
        
        [[[UIApplication sharedApplication] keyWindow] addSubview:backgroundView];

		[self.TextViewFeedback becomeFirstResponder];
	}];
}
*/

-(void)doneButtonClicked:(UIBarButtonItem*)button
{

    //    NSLog (@"I am %i message tye %i" , self.controlType , self.contentType);
//    return;
    
    if (self.controlType == 0 && self.contentType == 2) {
        
        [backgroundView removeFromSuperview];
        
        PPPinPadViewController * pinViewController = [[PPPinPadViewController alloc] init];
        pinViewController.delegate = self;
        pinViewController.pinTitle = @"Create Passcode";
        pinViewController.errorTitle = @"Passcode is not correct";
        pinViewController.cancelButtonHidden = NO; //default is False
        pinViewController.backgroundImage = [UIImage imageNamed:@"pinViewImage"];
        
        [_currentController presentViewController:pinViewController animated:YES completion:NULL];
        
    }
    else {
        [self finishCreate];
    }
    
//if you need remove the background set a empty UIImage ([UIImage new]) or set a background color
    //    pinViewController.backgroundColor = [UIColor blueColor]; //default is a darkGrayColor
    


}

- (BOOL)checkPin:(NSString *)pin {
    
    //NSLog (@"pin %@" , pin);
    self.pin = pin;
    
    [self finishCreate];
    
    return [pin isEqualToString:pin];
    

}

- (NSInteger)pinLenght {
    return 4;
}


-(void)finishCreate {

    if (![self image])
        self.image = [UIImage imageWithColor:[UIColor whiteColor] size:CGSizeMake(1.0f, 1.0f)];
    
    if (![self recording])
        self.recording = @"";
    
    if (!self.pin)
        self.pin = @"";
    
    NSDictionary* params = [NSDictionary dictionaryWithObjectsAndKeys:[self message] ,@"message",
                            [self color], @"color" ,
                            [self image], @"image" ,
                            [self recording], @"recording",
                            [self pin], @"pin",
                            [NSNumber numberWithInt:self.contentType], @"type",
                            nil];
    
    
	if (_completionHandler)
	{
        NSLog (@"recording %@" , params);

		_completionHandler(NO, [self message], [self image], params); // [self message], @"image" ,
	}
    
}

-(void)cancelButtonClicked:(UIBarButtonItem*)button
{
    
	if (_completionHandler)
	{
//        if (![self image])
//            self.image = [UIImage imageWithColor:[UIColor whiteColor] size:CGSizeMake(1.0f, 1.0f)];
        
		_completionHandler(YES, nil, nil, [NSDictionary dictionaryWithObjectsAndKeys:[self message] ,@"message", [self color], @"color" , [self image], @"image" ,   nil]); //
	}
}

-(void)show
{
    CGFloat offset = (IOS_7_OR_GREATER)? 0 : 20;
    
	if (_canEditText)
	{
 		[self setCenter:CGPointMake(CGRectGetMidX(self.superview.bounds), CGRectGetMidY(self.superview.bounds)-offset-keyboardHeight/2)];
	}
	else
	{
		[self setCenter:CGPointMake(CGRectGetMidX(self.superview.bounds), CGRectGetMidY(self.superview.bounds)-offset)];
	}
}

-(void)showInViewController:(UIViewController*)controller completionHandler:(IQFeedbackCompletion)completionHandler
{
    UISwipeGestureRecognizer *gesture = [[UISwipeGestureRecognizer alloc] init];
    
	_currentController = controller;
	_completionHandler = completionHandler;
    
    CGSize viewSize = controller.view.bounds.size;
    
    [self setFrame:CGRectMake(viewSize.width*0.05, -(viewSize.height-keyboardHeight-40), viewSize.width*0.90, viewSize.height-keyboardHeight-40)];

	//[controller.view addSubview:backgroundView];
    [[[UIApplication sharedApplication] keyWindow] addSubview:backgroundView];
	
	[UIView animateWithDuration:0.3 delay:0 options:UIViewAnimationOptionCurveEaseInOut animations:^{
		[self show];
		[backgroundView setBackgroundColor:[UIColor colorWithWhite:0 alpha:0.7]];
	} completion:^(BOOL finished) {
	}];
	[self.TextViewFeedback becomeFirstResponder];
}

-(void)dismiss
{
	[self.TextViewFeedback resignFirstResponder];
	[UIView animateWithDuration:0.3 delay:0 options:UIViewAnimationOptionCurveEaseInOut animations:^{
        CGSize viewSize = self.superview.bounds.size;
        [self setFrame:CGRectMake(viewSize.width*0.05, -(viewSize.height-keyboardHeight-40), viewSize.width*0.90, viewSize.height-keyboardHeight-40)];
		[backgroundView setBackgroundColor:[UIColor clearColor]];
	} completion:^(BOOL finished) {
		[backgroundView removeFromSuperview];
	}];
}




//This function courtesy of: http://damir.me/posts/ios7-blurring-techniques
-(UIImage *)blurredSnapshot
{
    // Create the image context
    UIGraphicsBeginImageContextWithOptions(self.bounds.size, NO, self.window.screen.scale);
    
    // There he is! The new API method
    [self drawViewHierarchyInRect:self.frame afterScreenUpdates:YES];
    
    // Get the snapshot
    UIImage *snapshotImage = UIGraphicsGetImageFromCurrentImageContext();
    
    // Now apply the blur effect using Apple's UIImageEffect category
    UIImage *blurredSnapshotImage = [snapshotImage applyExtraLightEffect];
    
    // Or apply any other effects available in "UIImage+ImageEffects.h"
    // UIImage *blurredSnapshotImage = [snapshotImage applyDarkEffect];
    // UIImage *blurredSnapshotImage = [snapshotImage applyExtraLightEffect];
    
    // Be nice and clean your mess up
    UIGraphicsEndImageContext();
    
    return blurredSnapshotImage;
}


@end
