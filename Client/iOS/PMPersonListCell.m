//
//  PMPersonListCellTableViewCell.m
//  weever
//
//  Created by Ilia Ridge on 4/13/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "PMPersonListCell.h"

@implementation PMPersonListCell

- (void)awakeFromNib
{
    // Initialization code
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated
{
    [super setSelected:selected animated:animated];
    
    [self setAccessoryType:UITableViewCellAccessoryDisclosureIndicator];

    // Configure the view for the selected state
}

@end
