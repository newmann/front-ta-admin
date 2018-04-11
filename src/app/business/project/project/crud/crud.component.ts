import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {ConfigService} from "../../../../service/constant/config.service";
import {FormBuilder} from "@angular/forms";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";

import {LoggerService} from "../../../../service/utils/logger";


@Component({
  selector: 'byl-project-crud',
  templateUrl: './crud.component.html',
})
export class ProjectCrudComponent implements OnInit {

    constructor(
        public msgService: NzMessageService,
        public projectService: ProjectService,
        public configService: ConfigService,
        public modalService: NzModalService,
        public modalSubject: NzModalSubject,
        public activatedRoute: ActivatedRoute,
        public logger: LoggerService,
        public fb: FormBuilder
    ) { }

    ngOnInit() {
    }

}
