import { ActivatedRoute, Route, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Player } from '../types/player.type';
import { Stat } from '../types/stat.type';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  @ViewChild('tile') divToMeasureElement! : ElementRef;


  // private property to store player value
  private _player: Player;
  private _tileDimension: number = 0;

  /**
   * Component constructor
   */
  constructor() {
    this._player = {} as Player;
  }

  get tileDimension(): number {
    return (window.innerWidth/4)/3;
  }

  get BigTileDimension(): number {
    return ((window.innerWidth/4)/3)*2;
  }

  /**
   * Returns private property _player
   */
  get player(): Player {
    return this._player;
  }

  get overall(): Stat{
    return {name:"Overall", value:this._player.overall}
  }
  
  get isGoalKeeper(): boolean{
    return this._player.playerPositions.includes("GK")
  }

  //----Not Goal Keeper Stat

  get shooting(): Stat{
    return {name:"Shooting", value:this._player.shooting}
  }
  
  get passing(): Stat{
    return {name:"Passing", value:this._player.passing}
  }
    
  get dribbling(): Stat{
    return {name:"Dribbling", value:this._player.dribbling}
  }

  get defending(): Stat{
    return {name:"Defending", value:this._player.defending}
  }

  get physic(): Stat{
    return {name:"Physic", value:this._player.physic}
  }

  //-----Goal Keeper Stat
    
  get diving(): Stat{
    return {name:"Diving", value:this._player.goalkeepingDiving}
  }
    
  get kicking(): Stat{
    return {name:"Kicking", value:this._player.goalkeepingKicking}
  }
    
  get positioning(): Stat{
    return {name:"Positioning", value:this._player.goalkeepingPositioning}
  }

  get reflexes(): Stat{
    return {name:"Reflexes", value:this._player.goalkeepingReflexes}
  }

  get speed(): Stat{
    return {name:"Speed", value:this._player.goalkeepingSpeed}
  }
  
  /**
   * Sets private property _person
   */
  @Input()
  set player(person: Player) {
    this._player = person;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {}

}
