//
//  PMEditProfileController.m
//  weever
//
//  Created by Ilia Ridge on 4/6/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "PMEditProfileController.h"
#import "UIImage+Additions.h"
#import "AppDelegate.h"

@interface PMEditProfileController ()

@end

@implementation PMEditProfileController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

-(PMEditProfileController*) initWithUser:(WEUser*)user completionHandler:(void(^)(id result))handler {

    if (self = [super init]) {
        self.user = user;
        self.completionHandler = handler;
    }
    
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    
    NSString* fontName = @"GillSans-Italic";
    NSString* boldFontName = @"GillSans-Bold";
    
    UIFont* labelFont = [UIFont fontWithName:boldFontName size:10.0f];
    
    UIColor* mainColor = [UIColor whiteColor];//[UIColor colorWithRed:222.0/255 green:59.0/255 blue:47.0/255 alpha:1.0f];
//    UIColor* imageBorderColor = [UIColor colorWithRed:222.0/255 green:59.0/255 blue:47.0/255 alpha:0.4f];
//    
//    UIFont* socialFont = [UIFont fontWithName:boldFontName size:7.0f];
//    UIColor* socialColor = [UIColor lightGrayColor];
    
//    [[UIBarButtonItem appearanceWhenContainedIn:[UINavigationBar class], nil] setTitleTextAttributes:[NSDictionary dictionaryWithObjectsAndKeys:[UIColor pmMainColor], UITextAttributeTextColor,nil]
//                                                                                            forState:UIControlStateNormal];
    
    
    
    self.navigationController.navigationBar.topItem.title = @"";
    UIImage* buttonImage = [[UIImage imageNamed:@"down2-512" tintColor:[UIColor pmMainColor] style:UIImageTintedStyleKeepingAlpha] imageScaledToSize:CGSizeMake(32, 24)];
    UIBarButtonItem *newBackButton = [[UIBarButtonItem alloc]  initWithImage:[buttonImage imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal]
                                                                       style:UIBarButtonItemStylePlain  target:self action:@selector(doneEditing:)];
    
    self.navigationItem.rightBarButtonItem = newBackButton;
    
    
    self.firstNameField.textColor =  mainColor;
    self.firstNameField.font =  [UIFont fontWithName:boldFontName size:16.0f];
    self.firstNameField.text = _user.firstName;
    self.firstNameField.layer.borderWidth = 1.0f;
    self.firstNameField.layer.borderColor = mainColor.CGColor;
    
    self.lastNameField.textColor =  mainColor;
    self.lastNameField.font =  [UIFont fontWithName:boldFontName size:16.0f];
    self.lastNameField.text = _user.lastName;

    self.titleNameField.textColor =  mainColor;
    self.titleNameField.font =  [UIFont fontWithName:boldFontName size:16.0f];
    self.titleNameField.text = _user.title;
    self.titleNameField.layer.borderWidth = 1.0f;
    self.titleNameField.layer.borderColor = mainColor.CGColor;

    
    self.bioLabel.textColor =  mainColor;
    self.bioLabel.font =  labelFont;
    self.bioLabel.text = @"Bio";
    
    UIFont* valueFont = [UIFont fontWithName:fontName size:14.0f];
    
    self.bioValueLabel.textColor =  mainColor;
    self.bioValueLabel.font =  valueFont;
    self.bioValueLabel.text = _user.bio;
    self.bioLabel.layer.borderWidth = 1.0f;
    self.bioLabel.layer.borderColor = mainColor.CGColor;
    
    self.profileImageView.image = _user.avatarImage;
    self.profileImageView.contentMode = UIViewContentModeScaleAspectFill;
    self.profileImageView.clipsToBounds = YES;
    self.profileImageView.layer.cornerRadius = 48.0f;
    self.profileImageView.layer.borderWidth = 4.0f;
    self.profileImageView.layer.borderColor = mainColor.CGColor;
    
    self.coverImageView.image = _user.coverImage;
    self.coverImageView.contentMode = UIViewContentModeScaleAspectFill;
    self.coverImageView.clipsToBounds = YES;

}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(IBAction) buttonImageClicked:(UIButton*)button
{
    
    NSLog (@"Changing image");
    
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
    
    [self presentViewController:picker animated:YES completion:nil];
    
    __weak UIImageView* ImageView = button.tag == 0 ? self.profileImageView : self.coverImageView ;
    
    self.imageEditor.doneCallback = ^(UIImage *editedImage, BOOL canceled){
        if(!canceled) {

            ImageView.image  = editedImage;
            
            [picker dismissViewControllerAnimated:YES completion:^{
                
            }];
            
        }
        
        [picker popToRootViewControllerAnimated:YES];
        [picker setNavigationBarHidden:NO animated:YES];
        
    };
    
    
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
        
	}];
}



-(IBAction)doneEditing:(id)sender {
    
    
    
    _user.firstName = self.firstNameField.text;
    _user.lastName = self.lastNameField.text;
    _user.title = self.titleNameField.text;
    _user.bio = self.bioValueLabel.text;
    _user.avatarImage = _profileImageView.image;
    _user.coverImage = _coverImageView.image;
    
    // NSLog (@"pre save %@" , _user);
    
//    NSLog (@"Done editing %@" , _user.ownerId);
//    
//    return;
    
    
    [_user save:^(id result) {
        
        NSLog (@"user id %@" , _user._id);
        
        if ([result isEqualToString:@"success"])
            if (self.completionHandler) {
                self.completionHandler(self);
            }
        
        [self dismissViewControllerAnimated:YES completion:nil];
        
    }] ;
    
}


@end
