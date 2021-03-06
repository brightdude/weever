//
//  InfiniteScrollPicker.h
//  InfiniteScrollPickerExample
//
//  Created by Philip Yu on 6/6/13.
//  Copyright (c) 2013 Philip Yu. All rights reserved.
//

#import <UIKit/UIKit.h>

@class InfiniteScrollPicker;

@protocol InfiniteScrollerPickerDelegate<NSObject>

-(void) didTapItemAtIndex:(NSInteger)index;

@end

@interface InfiniteScrollPicker : UIScrollView<UIScrollViewDelegate>
{
    NSMutableArray *imageStore;
    bool snapping;
    float lastSnappingX;
}

@property (nonatomic , strong) id<InfiniteScrollerPickerDelegate> parent;
@property (nonatomic, strong) NSArray *imageAry;
@property (nonatomic) CGSize itemSize;
@property (nonatomic) float alphaOfobjs;

@property (nonatomic) float heightOffset;
@property (nonatomic) float positionRatio;

- (void)initInfiniteScrollView;
- (void)setSelectedItem:(int)index;

@end
