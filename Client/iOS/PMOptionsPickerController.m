//
//  PMOptionsPickerController.m
//  weever
//
//  Created by Ilia Ridge on 4/11/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "PMOptionsPickerController.h"

@interface PMOptionsPickerController ()

@end

@implementation PMOptionsPickerController

- (id)initWithFrame:(CGRect)frame
{
    if (self = [super init]) {
        self.frame = frame;// [[UIView alloc] initWithFrame:frame];
    }
    
    NSLog(@"1 view frame height %f,%f", self.view.frame.size.height , self.view.frame.size.width);
    
    return self;
}


- (void)viewDidLoad
{
    [super viewDidLoad];
    
    self.view.frame = self.frame;
    
    self.tileCollection = [NSArray arrayWithObjects:@"micro-512", @"dropbox-512", @"slr_camera-512",@"skydrive-512", @"box-512", @"stack_of_photos_filled-512", @"gallery-512" , @"pen-512", nil];
    
    UICollectionViewFlowLayout *flowLayout = [
                                              [UICollectionViewFlowLayout alloc] init
                                              ];
    flowLayout.scrollDirection = UICollectionViewScrollDirectionHorizontal;
    flowLayout.minimumLineSpacing = 0;
    flowLayout.minimumInteritemSpacing = 0;
    //flowLayout.itemSize = CGSizeMake(self.view.frame.size.width / 2, self.view.frame.size.height / 2);
    
    // Set up the collection view with no scrollbars, paging enabled
    // and the delegate and data source set to this view controller
    
    self.collectionView = [[UICollectionView alloc]
                           initWithFrame:self.view.frame
                           collectionViewLayout:flowLayout
                           ];
    
    NSLog(@"2 view frame height %f,%f", self.view.frame.size.height , self.view.frame.size.width);
    
    [self.collectionView registerClass:[PMOptionsPickerCell class]
            forCellWithReuseIdentifier:@"CollectionCell"
     ];

    
    self.collectionView.showsHorizontalScrollIndicator = NO;
    self.collectionView.pagingEnabled = YES;
    self.collectionView.delegate = self;
    self.collectionView.dataSource = self;
    [self.view addSubview:self.collectionView];

}

- (NSInteger)collectionView:(UICollectionView *)collectionView
     numberOfItemsInSection:(NSInteger)section
{
    return 4;
}

- (NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView {
    return [self.tileCollection count] / 4;
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView
                  cellForItemAtIndexPath:(NSIndexPath *)indexPath
{
    // Dequeue a prototype cell and set the label to indicate the page
    
    NSLog(@"Options cell loading");
    
    PMOptionsPickerCell *cell = [collectionView
                        dequeueReusableCellWithReuseIdentifier:@"CollectionCell"
                        forIndexPath:indexPath
                        ];
    
    if (!cell) {
    }


    NSLog (@"No Cell %i" , (indexPath.section * 4 + indexPath.row));

    [cell setDelegate:self];
    [cell setTag:(indexPath.section * 4 + indexPath.row)];
    [cell setImage:[self.tileCollection objectAtIndex:(indexPath.section * 4 + indexPath.row)]];
    [cell.actionButton setTag:(indexPath.section * 4 + indexPath.row)];
    
    return cell;
}

- (CGSize)collectionView:(UICollectionView *)collectionView
                  layout:(UICollectionViewLayout *)collectionViewLayout
  sizeForItemAtIndexPath:(NSIndexPath *)indexPath
{
    return CGSizeMake(self.view.frame.size.width / 2, self.view.frame.size.height / 2);
}

-(void)onFinishedPickingOptions:(NSDictionary*)data {

    [self.view removeFromSuperview];
    [self.delegate onFinishedPickingOptions:data];

}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
