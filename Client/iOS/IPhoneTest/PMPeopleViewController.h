//
//  PMPeopleViewControllerTableViewController.h
//  weever
//
//  Created by Ilia Ridge on 4/13/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "PMPersonListCell.h"
#import "PMMPCFramework.h"
#import "WEUser.h"
#import "PMConstants.h"
#import "AppDelegate.h"


@interface PMPeopleViewController : UITableViewController

@property (nonatomic , strong) PMMPCFramework* mpcHandler;

@end
