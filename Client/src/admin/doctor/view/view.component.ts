import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { DoctorService } from 'src/admin/services/doctor.service';

@Component({
  selector: 'doctor-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass'],
})
export class ViewComponent implements OnInit {
  model: any = {
    acID: '',
  };

  Doctors: string[] = [];

  Doctor: any = {
    docID: '',
    fName: 'First Name',
    lName: 'Last Name',
    Doj: '',
    emailID: 'test_name@mail.com',
    phone: '123456789',
    city: 'city',
    state: 'state',
    department: 'speciality',
    image: '',
  };

  DoctorDetails: any = [this.Doctor];

  loaded: boolean = false;
  loadComplete: boolean = false;

  showProgressCard: boolean = false;
  showProgressWarn: boolean = false;
  progressMsg: string = '';

  constructor(private doctorService: DoctorService) {
    this.progressMsg = 'Loading Doctor Accounts From Blockchain';

    this.DoctorDetails = doctorService.DoctorDetails;
  }

  ngOnInit(): void {
    // this.GetDoctors();
    this.getDoctors();
  }

  loadDrDetails() {
    // for (var i = 0; i <= this.Doctors.length; i++) {
    //   this.doctorService.getDoctorDetails(this.Doctors[i]);
    // }
    this.getDoctors();
  }

  GetDoctors(): any {
    this.showProgressCard = true;
    this.showProgressWarn = false;
    this.progressMsg = '';

    this.DoctorDetails = [];

    if (this.DoctorDetails.length >= 1) {
      this.showProgressCard = false;
      return 0;
    }

    let docCall = setInterval(() => {
      console.log('interval');

      this.Doctors = this.doctorService.Doctors;
      if (this.Doctors.length >= 1) {
        this.loadDrDetails();
        this.progressMsg = 'Found ' + this.Doctors.length + ' Accounts';
        clearInterval(docCall);
      } else {
        this.progressMsg = 'No Doctors in the Network....';
      }
    }, 1000);

    let DoctorDetailsCall = setInterval(() => {
      console.log('loading Doc Details');
      console.log('Det len', this.doctorService.DoctorDetails.length);
      console.log('Doc len', this.Doctors.length);

      if (this.Doctors.length <= 0) {
        clearInterval(DoctorDetailsCall);
      }

      if (this.doctorService.DoctorDetails.length > 0) {
        this.loaded = true;
      }

      if (this.doctorService.DoctorDetails.length == this.Doctors.length) {
        console.log(this.doctorService.DoctorDetails);
        this.showProgressCard = false;
        this.loadComplete = true;
        this.DoctorDetails = this.doctorService.DoctorDetails;
        clearInterval(DoctorDetailsCall);
      } else {
        this.progressMsg = 'Loading Doctor Details From IPFS....';
        console.log('Doctor Details... fff', this.doctorService.DoctorDetails);
        this.DoctorDetails = this.doctorService.DoctorDetails;
      }
    }, 5000);
  }

  getDoctors() {
    this.showProgressCard = true;
    this.showProgressWarn = false;
    this.progressMsg = 'Loading....';

    this.DoctorDetails = [];
    this.Doctors = this.doctorService.Doctors;
    // this.progressMsg = 'Found ' + this.Doctors.length + ' Accounts';
    this.doctorService.getDoctors().subscribe((data:any) => {
      console.log(data);
      let Doctors = data
      this.DoctorDetails = Doctors.data;
      this.showProgressCard = false;
      this.loadComplete = true;
      this.loaded = true;
    });
  }
}
