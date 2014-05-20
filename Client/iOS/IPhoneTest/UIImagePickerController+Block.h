//
//  UIImagePickerController+UIImagePickerController_Block.h
//  weever
//
//  Created by Ilia Ridge on 4/19/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef void (^UIImagePickerControllerFinalizationBlock)(UIImagePickerController *picker, NSDictionary *info);
typedef void (^UIImagePickerControllerCancellationBlock)(UIImagePickerController *picker);

/**
 * A category class adding block support to UIImagePickerController, replacing delegation implementation.
 */
@interface UIImagePickerController (Block)

/** A block to be executed whenever the user pickes a new photo. Use this block to replace delegate method imagePickerController:didFinishPickingPhotoWithInfo: */
@property (nonatomic, strong) UIImagePickerControllerFinalizationBlock finalizationBlock;
/** A block to be executed whenever the user cancels the pick operation. Use this block to replace delegate method imagePickerControllerDidCancel: */
@property (nonatomic, strong) UIImagePickerControllerCancellationBlock cancellationBlock;

@end