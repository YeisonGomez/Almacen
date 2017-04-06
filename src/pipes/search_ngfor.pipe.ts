import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'search-filter',
    pure: false
})

export class SearchFilter implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        console.log(value);
        return value.filter(item => item.title.indexOf(args[0].title) !== -1);
    }
}