//
//  PMEditProfileController.h
//  weever
//
//  Created by Ilia Ridge on 4/6/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WEUser.h"
#import "WEImageEditorController.h"
#import <AssetsLibrary/AssetsLibrary.h>


@interface PMEditProfileController : UIViewController <UIImagePickerControllerDelegate,UINavigationControllerDelegate>

@property (nonatomic, weak) IBOutlet UIImageView* profileImageView;
@property (nonatomic, weak) IBOutlet UIImageView* coverImageView;

@property (nonatomic, weak) IBOutlet UITextField* firstNameField;
@property (nonatomic, weak) IBOutlet UITextField* lastNameField;
@property (nonatomic, weak) IBOutlet UITextField* titleNameField;
@property (nonatomic, weak) IBOutlet UITextView* bioValueLabel;

@property (nonatomic, weak) IBOutlet UILabel* locationLabel;

@property (nonatomic, weak) IBOutlet UILabel* bioLabel;
@property(nonatomic, strong) WEImageEditorController* imageEditor;
@property(nonatomic, strong) ALAssetsLibrary* library;
@property(nonatomic, strong) WEUser* user;

@property (nonatomic, copy) void(^completionHandler)(id);



-(IBAction) doneEditing:(id)sender;
-(IBAction) buttonImageClicked:(UIButton*)button;
-(PMEditProfileController*) initWithUser:(WEUser*)user completionHandler:(void(^)(id result))handler;

@end
