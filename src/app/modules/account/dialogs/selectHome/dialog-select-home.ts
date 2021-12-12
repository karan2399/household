import { Component, Inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DashboardComponent, DialogSelectData } from "../../components/dashboard/dashboard.component";


@Component({
    selector: 'dialog-select-home',
    templateUrl: 'dialog-select-home.html',
    styleUrls: ['dialog-select-home.scss']
})
export class DialogSelectHomeDialog {
    selectHomeForm: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<DashboardComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogSelectData,
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}