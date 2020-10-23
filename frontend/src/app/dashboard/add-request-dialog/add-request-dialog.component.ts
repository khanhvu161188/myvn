import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrisisStatus, DialogData, EmeRequestService } from '../services/eme-request-service';

export interface ITag {
  id?: string, //if new tag, then pass id = empty
     tagValue: string;
}

@Component({
  selector: 'app-add-request-dialog',
  templateUrl: './add-request-dialog.component.html',
  styleUrls: ['./add-request-dialog.component.css']
})
export class AddRequestDialogComponent implements OnInit {

  crisisStatus = new FormControl(CrisisStatus.Medium, [Validators.required]);

  tags: string[] = [];

  formGroup = new FormGroup({
    contactName: new FormControl('', [Validators.required]),
    contactPhone: new FormControl('', [Validators.required]),
    contactEmail: new FormControl('', [Validators.email]),
    instructionDetail: new FormControl(''),
    personNumber: new FormControl(''),
  });

  formTags: ITag[] = [];

  allTags: ITag[] = [];

  get allTagsStr() {
    return this.allTags.map(({tagValue}) => tagValue);
  }
  constructor(
    public dialogRef: MatDialogRef<AddRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private emeRequestService: EmeRequestService) { }

  ngOnInit(): void {
    this.allTags = [];
    this.getAllTags();
  }

  private getAllTags() {
    this.emeRequestService.tagsList().subscribe((data) => {
      console.log({data})
      this.allTags = data
    });
  }

  public onNoClick() {
    this.dialogRef.close();
  }

  get formInvalid() {
    return this.formGroup.invalid || this.crisisStatus.invalid;
  }

  public tagsChange(tagsValue: string[]) {
    console.log(tagsValue);
    const existTags = this.allTags.filter(({tagValue}) => tagsValue.includes(tagValue));
    const newTags = tagsValue.filter((value) => existTags.findIndex(({tagValue}) => tagValue === value) === -1).map((value) => ({
      tagValue: value
    }));
    this.formTags = [...existTags, ...newTags];
  }

  public onSubmit() {
    this.emeRequestService.create({
      contactName: this.formGroup.value.contactName,
      contactPhone: this.formGroup.value.contactPhone,
      contactEmail: this.formGroup.value.contactEmail,
      instructionDetail: this.formGroup.value.instructionDetail,
      personNumber: this.formGroup.value.personNumber,
      crisisStatus: parseInt(this.crisisStatus.value) ,
      lat: this.data.lat,
      lon: this.data.lat,
      tags: this.formTags
    }).subscribe((resp) => {
      console.log(resp);
      this.dialogRef.close();
    })
  }
}
