import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-addteam',
  templateUrl: './addteam.component.html',
  styleUrls: ['./addteam.component.css']
})
export class AddteamComponent implements OnInit {
  team: any = {};
  teamForm: FormGroup;
  constructor(private fb: FormBuilder,
    private teamService: TeamService,
    private router: Router) { }

  ngOnInit() {
    this.teamForm = this.fb.group({
      name: [''],
      country: [''],
      foundation: [''],
      stadium: ['']
    })
  }
  addTeam() {
    alert('BTN clicked');
    console.log('here the team object', this.team);
    this.teamService.addteam(this.team).subscribe(
      ()=> {
        console.log('added team with success');
        
      }
    )
  }

}
