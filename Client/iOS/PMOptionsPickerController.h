//
//  PMOptionsPickerController.h
//  weever
//
//  Created by Ilia Ridge on 4/11/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "PMOptionsPickerCell.h"

@interface PMOptionsPickerController : UIViewController

<UICollectionViewDelegate,
UICollectionViewDataSource,
UICollectionViewDelegateFlowLayout,
OptionsPickerDelegate>

@property (strong, nonatomic) id<OptionsPickerDelegate> delegate;
@property (strong, nonatomic) UICollectionView *collectionView;
@property (strong, nonatomic) NSArray *tileCollection;

@property (nonatomic) CGRect frame;

- (id)initWithFrame:(CGRect)frame;

@end
