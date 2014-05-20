//
//  PMTextEditController.m
//  weever
//
//  Created by Ilia Ridge on 4/8/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "PMTextEditController.h"
#import "UIColor+UIColor_Additions.h"
#import "UIImage+ImageEffects.h"
#import "FlatTheme.h"
#import "PMOptionsPickerCell.h"
#import <DBChooser/DBChooser.h>
#import "UIImage+Additions.h"



@interface PMTextEditController ()

@end

@implementation PMTextEditController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    [FlatTheme styleSegmentedControlWithFontName:[UIFont pmControlTextFont] andSelectedColor:[UIColor pmOnColor] andUnselectedColor:[UIColor pmOffColor] andDidviderColor:[UIColor pmDividerColor]];
    
    [self.view setBackgroundColor:[UIColor colorWithWhite:0.9 alpha:1.0]];
    
//    [self.modeControl removeFromSuperview];
//    self.modeControl = [self createSegmentedControlWithItems:[NSArray arrayWithObjects:@"OPEN", @"PUBLIC", @"PRIVATE", nil]];
//    [self.modeControl addTarget:self action:@selector(segmentValueChanged:) forControlEvents:UIControlEventValueChanged];
//    //self.modeControl.frame = frame;
//    [self.view addSubview:self.modeControl];
//    [self.modeControl setTag:999];
    self.contentOptions = [NSArray arrayWithObjects:@[@"OPEN" ,[UIColor pmColorGreen]], @[@"CLOSED" ,[UIColor orangeColor]],@[@"PRIVATE" ,[UIColor pmOnColor]] , nil];
    
    self.contentType = 0;
    
    CGFloat button_y = 220;
    self.titleButton = [UIButton buttonWithType:UIButtonTypeCustom];
    [self.titleButton addTarget:self action:@selector(contentTypeChange:) forControlEvents:UIControlEventTouchUpInside];
    [self.titleButton setFrame:CGRectMake(100, button_y, 120, 30)];
    [self.titleButton setTitle:[[self.self.contentOptions objectAtIndex:self.contentType] objectAtIndex:0] forState:UIControlStateNormal];
    [self.titleButton setTitle:[[self.self.contentOptions objectAtIndex:self.contentType] objectAtIndex:0] forState:UIControlStateHighlighted];
    
    [self.titleButton setBackgroundColor:[[self.self.contentOptions objectAtIndex:self.contentType] objectAtIndex:1]];
    [self.titleButton.titleLabel setTextAlignment:NSTextAlignmentCenter];
    [self.titleButton.titleLabel setFont:[UIFont fontWithName:[UIFont pmControlTextFont] size:14.0f]];
    [self.titleButton.titleLabel setTextColor:[UIColor whiteColor]];
    
    [self.view addSubview:self.titleButton];
    
    UISwipeGestureRecognizer* recognizerLeft = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(handleSwipeLeft:)];
    [recognizerLeft setDirection:(UISwipeGestureRecognizerDirectionLeft)];
    [self.view addGestureRecognizer:recognizerLeft];
    
    UISwipeGestureRecognizer* recognizerRight = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(handleSwipeRight:)];
    [recognizerRight setDirection:(UISwipeGestureRecognizerDirectionRight)];
    [self.view addGestureRecognizer:recognizerRight];
    
//    UIButton* addImageButton = [UIButton buttonWithType:UIButtonTypeCustom];
//    [addImageButton setImage:[UIImage imageNamed:@"slr_camera-512" tintColor:[UIColor pmMainColor] style:UIImageTintedStyleKeepingAlpha] forState:UIControlStateNormal];
//    addImageButton.frame = CGRectMake(80, button_y ,32,32);
//    [addImageButton addTarget:self action:@selector(buttonImageClicked:) forControlEvents:UIControlEventTouchUpInside];
//
//    [self.view addSubview:addImageButton];
    
    UIButton* addVoiceButton = [UIButton buttonWithType:UIButtonTypeCustom];
    [addVoiceButton setImage:[UIImage imageNamed:@"paper_clip-512" tintColor:[UIColor pmMainColor] style:UIImageTintedStyleKeepingAlpha]  forState:UIControlStateNormal];
    addVoiceButton.frame = CGRectMake(self.view.frame.size.width - 48 , self.view.frame.origin.y + 24 ,32,32);
    [addVoiceButton addTarget:self action:@selector(buttonVoiceClicked:) forControlEvents:UIControlEventTouchUpInside];
    

    
    [self.view addSubview:addVoiceButton];

    self.imageView.layer.cornerRadius = 5.0f;
    self.imageView.clipsToBounds = YES;

    self.doneButton = [UIButton buttonWithType:UIButtonTypeCustom];
    [self.doneButton setImage:[UIImage imageNamed:@"left-512" tintColor:[UIColor pmOnColor] style:UIImageTintedStyleKeepingAlpha] forState:UIControlStateNormal];
    [self.doneButton setImage:[UIImage imageNamed:@"left-512" tintColor:[UIColor pmOffColor] style:UIImageTintedStyleKeepingAlpha] forState:UIControlStateHighlighted];
    [self.doneButton addTarget:self action:@selector(onDismiss:) forControlEvents:UIControlEventTouchUpInside];
    [self.doneButton setFrame:CGRectMake(20, button_y ,32,32)];

    self.createButton = [UIButton buttonWithType:UIButtonTypeCustom];
    [self.createButton setImage:[UIImage imageNamed:@"down2-512" tintColor:[UIColor pmOnColor] style:UIImageTintedStyleKeepingAlpha] forState:UIControlStateNormal];
    [self.createButton setImage:[UIImage imageNamed:@"down2-512" tintColor:[UIColor pmOffColor] style:UIImageTintedStyleKeepingAlpha] forState:UIControlStateHighlighted];
    [self.createButton addTarget:self action:@selector(onCreateClicked:) forControlEvents:UIControlEventTouchUpInside];
    [self.createButton setFrame:CGRectMake(260, button_y ,32,32)];
    
    [self.view addSubview:self.doneButton];
    [self.view addSubview:self.createButton];

    [self.textView setFont:[UIFont fontWithName:[UIFont pmControlAlternateTextFont] size:18.0f]];
    self.textView.keyboardAppearance = UIKeyboardAppearanceDark;// (SYSTEM_VERSION_LESS_THAN(@"7.0") ? UIKeyboardAppearanceAlert : UIKeyboardAppearanceDark);
    [self.textView setTextColor:[UIColor blackColor]];
    [self.textView becomeFirstResponder];
    
}

-(void) contentTypeChange:(id)sender {
    
    self.contentType +=1;
    if (self.contentType == [self.contentOptions count]) {
        self.contentType = 0;
    }
    
    [self.titleButton setTitle:[[self.self.contentOptions objectAtIndex:self.contentType] objectAtIndex:0] forState:UIControlStateNormal];
    [self.titleButton setTitle:[[self.self.contentOptions objectAtIndex:self.contentType] objectAtIndex:0] forState:UIControlStateHighlighted];
    [self.titleButton setBackgroundColor:[[self.self.contentOptions objectAtIndex:self.contentType] objectAtIndex:1]];
    
}

-(UISegmentedControl*)createSegmentedControlWithItems:(NSArray*)items{
    
    UISegmentedControl* segmentedControl = [[UISegmentedControl alloc] initWithItems:items];
    
    segmentedControl.frame = CGRectMake(70, 20, 180, 30);
    segmentedControl.selectedSegmentIndex = 1;
    
    return segmentedControl;
}

-(void) segmentValueChanged:(UISegmentedControl*)sender {
    
}

-(void) handleSwipeLeft:(UISwipeGestureRecognizer*)_recognizer {
    
    
    NSLog(@"Swipe Left detected");
    
    UIColor* randomColor = [UIColor randomColor:1.0f];
    
//    self.color = [UIColor hexValuesFromUIColor:randomColor];
    [self.imageView setBackgroundColor:randomColor];
    self.imageView.alpha = 0.3;
    
}

-(void) handleSwipeRight:(UISwipeGestureRecognizer*)_recognizer {
    NSLog(@"Swipe Right detected");
    
//    self.contentType += 1;
//    
//    if (self.contentTypeColors) {
//        if (self.contentType > ([self.contentTypeColors count] - 1)) {
//            self.contentType = 0;
//        }
//        
//        [navigationBar setBackgroundColor:[self.contentTypeColors objectAtIndex:self.contentType]];
//    }
//    
//    if (self.contentTypeLabels) {
//        if (self.contentType > ([self.contentTypeLabels count] - 1)) {
//            self.contentType = 0;
//        }
//        
//        [self setTitle:[self.contentTypeLabels objectAtIndex:self.contentType]];
//    }
    
}

-(void)buttonVoiceClicked:(UIButton*)button
{
    
    self.options = [[PMOptionsPickerController alloc] initWithFrame:CGRectMake(0, 0, 320, 264)];
	[self.options setDelegate:self];
    [self.view addSubview:self.options.view];

//    CGRectMake(320, 0, 0, 264)
//    [UIView animateWithDuration:0.5
//                          delay:0
//                        options:UIViewAnimationOptionCurveEaseIn
//                     animations:^{
//                         // other animations here
//                         self.options.view.frame = CGRectMake(0, 0, 320, 264);
//                         
//                     }
//                     completion:^(BOOL finished){
//                         // ... completion stuff
//                     }
//     ];
    
    return;
    
    
}

-(void)onFinishedPickingOptions:(NSDictionary*)data {

    NSLog (@"Option Key from TEXT %@" , data);
    
    int value = [[data objectForKey:@"option"] intValue];
    
    if (value==0) { // voice
        
        self.voiceControler =  [[AViewController alloc] init];
        [self.voiceControler setDelegate:self];
        self.voiceControler.view.frame = self.imageView.frame;
        [self.view addSubview:self.voiceControler.view];
        
    }
    
    if (value == 1) {
        
        /*
         @interface DBChooserResult : NSObject
         
         // URL to access the file, which varies depending on the link type specified when the
         // Chooser was triggered
         @property NSURL *link;
         
         // Name of the file
         @property NSString *name;
         
         // Size of the file in bytes
         @property long long size;
         
         // URL to a 64x64px icon for the file based on the file's extension.
         @property NSURL *iconURL;
         
         // Set of thumbnail URLs generated when the user selects images and videos. It returns
         // three sizes: 64x64px, 200x200px, and 640x480px. If the user didn't select an image
         // or video, no thumbnails will be included. 
         @property NSDictionary *thumbnails;
         
         @end */

        [[DBChooser defaultChooser] openChooserForLinkType:DBChooserLinkTypeDirect//DBChooserLinkTypePreview
                                        fromViewController:self completion:^(NSArray *results)
         {
             if ([results count]) {
                 // Process results from Chooser
                 DBChooserResult* result = [results objectAtIndex:0];
                 // NSLog (@"DropBox file count %@" , result.thumbnails );
                 
                 self.fileUrl = [result.link absoluteString];
                 
                 //[self.textView setText:[result.link absoluteString]];
             } else {
                 // User canceled the action
             }
         }];
    }// DROPBOX
    
    if (value == 2) {
        [self buttonImageClicked:nil];
    }
    
    
}


- (void)voiceRecordingController:(AViewController *)recorder didFinishRecording:(NSString *)filePath  {
    
    if (filePath) {
        
        //[self.addVoiceButton setImage:[UIImage imageNamed:@"micro-512" tintColor:[UIColor greenColor] style:UIImageTintedStyleKeepingAlpha] forState:UIControlStateNormal];
        NSLog(@"Recording path %@" , filePath);
        
        [self setRecording:filePath];
    }
    else {
        [self setRecording:@""];
    }
    
    [self.voiceControler.view removeFromSuperview];
    
    
//    [recorder dismissViewControllerAnimated:YES completion:^{
//        
//        [[[UIApplication sharedApplication] keyWindow] addSubview:backgroundView];
//        
//		[self.TextViewFeedback becomeFirstResponder];
//	}];
    
}


-(void)buttonImageClicked:(UIButton*)sender
{
    UIImagePickerController *picker = [[UIImagePickerController alloc] init];
    
    picker.allowsEditing = NO;
    picker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
    picker.delegate = self;
    //self.window.rootViewController = picker;
    
    
    [self presentViewController:picker animated:YES completion:nil];
    
    /*
     UIImagePickerController *controller = [[UIImagePickerController alloc] init];
     [controller setDelegate:self];
     [_currentController presentViewController:controller animated:YES completion:nil]; */
    
    
    /*
     
     
     */
    
    
}

-(void) imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info
{
    ALAssetsLibrary *library = [[ALAssetsLibrary alloc] init];
    WEImageEditorController* imageEditor = [[WEImageEditorController alloc] initWithNibName:@"WEImageEditorController" bundle:nil];
    imageEditor.checkBounds = YES;
    imageEditor.rotateEnabled = YES;
    library = library;
    
    imageEditor.doneCallback = ^(UIImage *editedImage, BOOL canceled){
        if(!canceled) {
            
//            [sender setImage:[UIImage imageNamed:@"slr_camera-512" tintColor:[UIColor greenColor] style:UIImageTintedStyleKeepingAlpha] forState:UIControlStateNormal];
            
            NSLog (@"image size %f, %f" , editedImage.size.height , editedImage.size.width);
            
            [self.imageView setImage:editedImage];
            self.imageView.alpha = 0.5;
            
            [picker dismissViewControllerAnimated:YES completion:^{
                
                [self.textView becomeFirstResponder];
            }];
            
            
            
        }
    };

    UIImage *originalImage =  [info objectForKey:UIImagePickerControllerOriginalImage];
    
    UIImage *image = [UIImage imageWithImage:originalImage scaledToSize:CGSizeMake(originalImage.size.width * 0.25 , originalImage.size.height * 0.25) ];
    
    NSLog (@"image size passed to editor %f, %f" , image.size.height , image.size.width);
    
    NSURL *assetURL = [info objectForKey:UIImagePickerControllerReferenceURL];
    
    [library assetForURL:assetURL resultBlock:^(ALAsset *asset) {
        UIImage *preview = [UIImage imageWithCGImage:[asset aspectRatioThumbnail]];
        
        imageEditor.sourceImage = image;
        imageEditor.previewImage = preview;
        [imageEditor reset:NO];
        
        [picker pushViewController:imageEditor animated:YES];
        [picker setNavigationBarHidden:YES animated:NO];
        
        
    } failureBlock:^(NSError *error) {
        NSLog(@"Failed to get asset from library");
    }];
}

- (void) imagePickerControllerDidCancel:(UIImagePickerController *)picker
{
	[picker dismissViewControllerAnimated:YES completion:^{
        
		[self.textView becomeFirstResponder];
	}];
}

-(void)onCreateClicked:(UIButton*)button
{
    
    //    NSLog (@"I am %i message tye %i" , self.controlType , self.contentType);
    //    return;
    
    if (self.controlType == 0 && self.contentType == 2) {
        
        
        PPPinPadViewController * pinViewController = [[PPPinPadViewController alloc] init];
        pinViewController.delegate = self;
        pinViewController.pinTitle = @"Create Passcode";
        pinViewController.errorTitle = @"Passcode is not correct";
        pinViewController.cancelButtonHidden = NO; //default is False
        pinViewController.backgroundImage = [UIImage imageNamed:@"pinViewImage"];
        
        [self presentViewController:pinViewController animated:YES completion:NULL];
        
    }
    else {
        [self finishCreate];
    }
    
    //if you need remove the background set a empty UIImage ([UIImage new]) or set a background color
    //    pinViewController.backgroundColor = [UIColor blueColor]; //default is a darkGrayColor
    
    
    
}

-(void) onDismiss:(id)sender {
    [self.delegate onFinishedCreatingContent:nil];
    [self dismissViewControllerAnimated:YES completion:nil];
}

-(void)finishCreate {
    
    if (!self.imageView.image)
        self.imageView.image = [UIImage imageWithColor:[UIColor whiteColor] size:CGSizeMake(1.0f, 1.0f)];
    
    if (![self recording])
        self.recording = @"";
    
    if (!self.pin)
        self.pin = @"";
    
    NSDictionary* params = [NSDictionary dictionaryWithObjectsAndKeys:self.textView.text ,@"message",
                            [UIColor hexValuesFromUIColor:self.imageView.backgroundColor], @"color" , // need to convert it to text
                            self.imageView.image , @"image" ,
                            self.recording, @"recording",
                            self.fileUrl ? self.fileUrl : @"" , @"fileUrl",
                            self.pin, @"pin",
                            [NSNumber numberWithInt:self.contentType], @"type",
                            nil];
    
    [self.delegate onFinishedCreatingContent:params];
    [self dismissViewControllerAnimated:YES completion:nil];
    
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






- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}



@end
