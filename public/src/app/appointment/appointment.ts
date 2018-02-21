export class Appointment {
	id: string;
	appttime: string;
	apptdate: string;
	complaint: string;
	name: string;
	fulldate: Date;

	constructor(id: string, time: string, date: string, fulldate: Date, complaint: string, name: string ){
		this.id = id;
		this.appttime = time;
		this.apptdate = date;
		this.complaint = complaint;
		this.name = name;
		this.fulldate = fulldate;
	}
}

