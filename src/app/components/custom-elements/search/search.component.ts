import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('wrapper') searchWrapper;
  @ViewChild('holder') inputHolder;
  @ViewChild('input') searchInput;
  @Output() onChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  searchToggle(event){
    if (!this.searchWrapper.nativeElement.classList.contains('active')){
      this.searchWrapper.nativeElement.classList.add('active');
          event.preventDefault();
    } else if (this.searchWrapper.nativeElement.classList.contains('active')) {
      this.searchWrapper.nativeElement.classList.remove('active');
            // clear input
      this.searchInput.nativeElement.value = '';
     }
  }

  onChanged(value) {
    this.onChange.emit(value);
  }

}
