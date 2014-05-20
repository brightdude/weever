//
//  WEActivityFactory.m
//  weever
//
//  Created by Ilia Ridge on 4/18/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//
#import <DBChooser/DBChooser.h>
#import "WEActivityFactory.h"
#import "UIImagePickerController+Block.h"
#import "WEPreviewController.h"



@implementation WEActivityFactory

+(UIViewController*)rootController {

    UIWindow *window = [UIApplication sharedApplication].keyWindow;
    UIViewController *rootViewController = window.rootViewController;
    
    return rootViewController;
    
}

+(WECustomActivity*)dropBoxActivity :(performBlock)completionBlock {

    WECustomActivity* dropBoxActivity = [WECustomActivity withImageName:@"dropbox" andTitle:@"DropBox"
                                                               andBlock:^(id result) {
                                                                   NSLog(@"Bloc executing here");
                                                                   [[DBChooser defaultChooser] openChooserForLinkType:DBChooserLinkTypeDirect//DBChooserLinkTypePreview
                                                                                                   fromViewController:[WEActivityFactory rootController] completion:^(NSArray *results)
                                                                    {
                                                                        if ([results count]) {
                                                                            
                                                                            DBChooserResult* result = [results objectAtIndex:0];
                                                                            
                                                                            completionBlock ([result.link absoluteString]);
                                                                            //NSLog (@"DropBox file count %@" , [result.link absoluteString] );
                                                                        } else {
                                                                            completionBlock(nil);
                                                                        }
                                                                    }];
                                                                   
                                                               }];
    
    return dropBoxActivity;

}

//          [WECustomActivity withImageName:@"micro" andTitle:@"Voice"                                                                                                                                          andBlock:^(id result) {

+(WECustomActivity*)imagePickerActivity :(performBlock)completionBlock {
    
    WECustomActivity* imagePickerActivity = [WECustomActivity withImageName:@"stack_of_photos_filled" andTitle:@"Photo Library"
                                                               andBlock:^(id result) {
                                                                   
                                                                   NSLog(@"Bloc Image Picked");
                                                                   
                                                                   UIImagePickerController *picker = [[UIImagePickerController alloc] init];
                                                                   
                                                                   picker.allowsEditing = NO;
                                                                   picker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
                                                                   picker.finalizationBlock = ^(UIImagePickerController *picker, NSDictionary *info){
                                                                       
                                                                       [picker dismissViewControllerAnimated:YES completion:nil];
                                                                       
                                                                       completionBlock(info);
                                                                   };
                                                                   
                                                                   picker.cancellationBlock = ^(UIImagePickerController *picker) {

                                                                       [picker dismissViewControllerAnimated:YES completion:nil];

                                                                       completionBlock(nil);
                                                                   };
                                                                   
                                                                   UIViewController* vc = [WEPreviewController previewController];
                                                                   
                                                                   [vc presentViewController:picker animated:YES completion:nil];

                                                               }];
    
    return imagePickerActivity;
    
}

+(WECustomActivity*)voiceRecorderActivity :(performBlock)completionBlock {
    
    WECustomActivity* voiceRecorderActivity = [WECustomActivity withImageName:@"micro" andTitle:@"Voice Recorder"
                                                                   andBlock:^(id result) {
                                                                       NSLog(@"Voice Recorder Picked");
                                                                       
                                                                   }];
    
    return voiceRecorderActivity;
    
}

+(WECustomActivity*)photoCameraActivity :(performBlock)completionBlock {
    
    WECustomActivity* photoCameraActivity = [WECustomActivity withImageName:@"slr_camera" andTitle:@"Photo Camera"
                                                                     andBlock:^(id result) {
                                                                         NSLog(@"Photo Camera Picked");
                                                                         
                                                                         NSLog(@"Bloc Image Picked");
                                                                         
                                                                         UIImagePickerController *picker = [[UIImagePickerController alloc] init];
                                                                         
                                                                         picker.allowsEditing = NO;
                                                                         picker.sourceType = UIImagePickerControllerSourceTypeCamera;
                                                                         picker.finalizationBlock = ^(UIImagePickerController *picker, NSDictionary *info){
                                                                             
                                                                             [picker dismissViewControllerAnimated:YES completion:nil];
                                                                             
                                                                             completionBlock(info);
                                                                         };
                                                                         
                                                                         picker.cancellationBlock = ^(UIImagePickerController *picker) {
                                                                             
                                                                             [picker dismissViewControllerAnimated:YES completion:nil];
                                                                             
                                                                             completionBlock(nil);
                                                                         };
                                                                         
                                                                         UIViewController* vc = [WEPreviewController previewController];
                                                                         
                                                                         [vc presentViewController:picker animated:YES completion:nil];
                                                                         
                                                                         
                                                                     }];
    
    return photoCameraActivity;
    
}


/*
[WECustomActivity withImageName:@"slr_camera" andTitle:@"Camera"                                                                                                                               andBlock:^(id result) {
    NSLog(@"Bloc executing here");
}],
*/



+(id)activityController:(NSArray*)items {
    
    UIActivityViewController *controller = [[UIActivityViewController alloc] initWithActivityItems:nil
                                                                             applicationActivities:items
                                            ];
    
    
    NSArray *excludedActivities = @[UIActivityTypePostToTwitter, UIActivityTypePostToFacebook,
                                    UIActivityTypePostToWeibo,
                                    UIActivityTypeMessage, UIActivityTypeMail,
                                    UIActivityTypePrint, UIActivityTypeCopyToPasteboard,
                                    UIActivityTypeAssignToContact, UIActivityTypeSaveToCameraRoll,
                                    UIActivityTypeAddToReadingList, UIActivityTypePostToFlickr,
                                    UIActivityTypePostToVimeo, UIActivityTypePostToTencentWeibo];

    controller.excludedActivityTypes = excludedActivities;
    
    return controller;

}

@end
