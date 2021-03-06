import { Directive, OnChanges, AfterViewInit, OnInit, Input, Output, ElementRef, EventEmitter, SimpleChange } from '@angular/core';
import { DragulaService, dragula } from 'ng2-dragula';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { debounce } from 'rxjs/operators';


@Directive({ selector: '[primeDragula]' })
export class PrimeDragulaDirective implements OnChanges, OnInit, AfterViewInit {
  @Input() public primeDragula: string;
  @Input() public dragulaModel: any;
  @Input() public dragulaOptions: any;
  subcribe: any;
  @Output() onDroped = new EventEmitter<any[]>();
  @Output() onOver = new EventEmitter<any[]>();
  protected container: any;
  private drake: any;
  private options: any;

  private el: ElementRef;
  private dragulaService: DragulaService;
  public constructor(el: ElementRef, dragulaService: DragulaService) {
    this.el = el;
    this.dragulaService = dragulaService;
  }
  ngOnInit() {
    this.options = Object.assign({}, this.dragulaOptions);
    this.container = this.el.nativeElement;

    if (!this.options.initAfterView) {
      this.initialize();
    }
  }

  ngAfterViewInit() {
    if (this.options.initAfterView) {
      this.initialize();
    }
  }
   
  //since we dont have access to the ngprime datatable body or table itself we need to bing laters in the angular event cycle
  //Once this fires we have a tbody tag to attach to and create the drag drop area from.
  //because we need to setup dragula later we needed to create our own version of the directive so we have access to the private property container.
  //If ngdragula ever changes that to protected we can just extend that directive outright and override the container.
  protected initialize() {

    if (this.options.childContainerSelector) {
      this.container = this.el.nativeElement.querySelector(this.options.childContainerSelector);
      this.options.mirrorContainer = this.container;
    }

    let bag = this.dragulaService.find(this.primeDragula);
    let checkModel = () => {
      if (this.dragulaModel) {
        if (this.drake.models) {
          this.drake.models.push(this.dragulaModel);
        } else {
          this.drake.models = [this.dragulaModel];
        }
      }
    };
    if (bag) {
      this.drake = bag.drake;
      checkModel();
      this.drake.containers.push(this.container);
    } else {
      this.drake = dragula([this.container], this.options);
      checkModel();
      this.dragulaService.add(this.primeDragula, this.drake);
    }

    this.dragulaService.over.subscribe((value, target, source) => {
      this.onOver.emit([value[0], value[1]]);
    });

    this.subcribe = this.dragulaService.drop.subscribe((value) => {
      this.onDroped.emit([value[0], value[1]]);
    });

    
  }

  public ngOnChanges(changes: { dragulaModel?: SimpleChange }): void {
    
    if (changes && changes.dragulaModel) {
      if (this.drake) {
        if (this.drake.models) {
          let modelIndex = this.drake.models.indexOf(changes.dragulaModel.previousValue);
          this.drake.models.splice(modelIndex, 1, changes.dragulaModel.currentValue);
        } else {
          this.drake.models = [changes.dragulaModel.currentValue];
        }
      }
    }

  }
}
