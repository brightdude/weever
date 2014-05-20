//
//  ControllerInfo.h
//  ADVFlatUI
//
//  Created by Tope on 06/06/2013.
//  Copyright (c) 2013 App Design Vault. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ControllerInfo : NSObject

@property (nonatomic, strong) NSString* name;

@property (nonatomic, strong) NSString* controllerId;

-(id)initWithName:(NSString*)name andControllerId:(NSString*)controllerId;

@end
