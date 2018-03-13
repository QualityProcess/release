import { Component, forwardRef, Input, OnInit, ElementRef, OnDestroy, HostBinding, Renderer2, HostListener } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  inputs: ['activeColor', 'baseColor', 'overlayColor'],
  providers: [
    { provide: MatFormFieldControl, useExisting: FileUploaderComponent },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true
    }
  ]
})
export class FileUploaderComponent implements ControlValueAccessor, ControlValueAccessor {

  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';

  @Input('value') _value = '';
  @Input() valuePlaceholder: string;
  onChange: any = () => { };
  onTouched: any = () => { };


  get value() {
    return this._value;
  }

  set value(val: any) {
    //this._value = val.name;
    this.imageSrc = val;

    //this.onChange(val);
    this.onTouched();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    if (value) {
      console.log('write value', value);
      this.value = value;
      this.imageSrc = value;
      this.loaded = true;
    }
  }


  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e: any) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad() {
    this.imageLoaded = true;
  }

  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    console.log('handleInputChange file', file);
    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    this.loaded = false;

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any) {
    var reader = e.target;
    console.log('reader file', reader);
    this.imageSrc = reader.result;
    this.loaded = true;
  }
}

