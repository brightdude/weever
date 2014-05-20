//
//  PMSettingsController.h
//  weever
//
//  Created by Ilia Ridge on 4/5/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface PMSettingsController :  UIViewController <UITableViewDataSource, UITableViewDelegate>

@property (nonatomic, strong) IBOutlet UITableView* tableView;

-(void) dismissViewTapped:(id)sender;

@end
