let mContract = web3.eth.contract(config.cabi).at(config.caddress);

console.log("------------------The app started--------------------");
function setDoctorDetails(did, dname, demail, dcnum, dedu, dadd) {
	$('.success').val('');

	mContract.setDoctorDetails(did, dname, demail, dcnum, dedu, dadd, function (error, result) {
		if (!error) {
			$('.success').append("Success: Doctor information will be added in hospital record!!! <a target=\"blank\" href='https://rinkeby.etherscan.io/tx/" + result + "'>here</a>");
			$("#did").val('');
			$("#dname").val('');
			$("#demail").val('');
			$("#dcnum").val('')
			$("#dedu").val('');
			$("#dadd").val('');
		} else {
			console.log(error);
			toastr.error("Something went wrong. Look in the console for more information");
		}
	});
}

function setPatientDetails(pid, pname, pemail, pcnum, padd, pcd) {
	$('.success1').val('');

	mContract.setPatientDetails(pid, pname, pemail, pcnum, padd, pcd, function (error, result) {
		if (!error) {
			$('.success1').append("Success: Patient information will be added in hospital record!!! <a target=\"blank\" href='https://rinkeby.etherscan.io/tx/" + result + "'>here</a>");
			$("#pid").val('');
			$("#pname").val('');
			$("#pemail").val('');
			$("#pcnum").val('')
			$("#padd").val('');
			$("#pcd").val('');
		} else {
			console.log(error);
			toastr.error("Something went wrong. Look in the console for more information");
		}
	});
}

function Transfer(_to, _value) {
	$('.success4').val('');
    console.log(_to);
	mContract.transfer(_to, _value, function (error, result) {
		if (!error) {
			$('.success4').append("Success: Token has been transfer to the respective account! <a target=\"blank\" href='https://rinkeby.etherscan.io/tx/" + result + "'>here</a>");
			$("#t_id").val('');
		} else {
			console.log(error);
			toastr.error("Something went wrong. Look in the console for more information");
		}
	});
}

function getPatientDetails(p_id) {
	$('#patientRow').text('');
	$('.success3').val('');

	mContract.getPatientInfo(p_id, function (error, data) {
		if (!error) {
			$('.success3').append("Success: Patient information has been displayed in Patient details's table!!!");
			let pname = data[0];
			let pmail = data[1];
			let pcont = data[2];
			let padd1 = data[3];
			let pcslt = data[4];

			let html = '<div class="col-sm-6 col-md-4 col-lg-3">';

			html += '<div class="panel panel-default jumbotron">';
			html += '<div class = "centerAlign"> Patient Details</div>';
			html += '<div class="panel-body padding0">'
			html += '<strong>Patient Name</strong>: <input type="text" class="form-control" value="' + pname + '"readonly><br/>';
			html += '<strong>Patient Email</strong>: <input type="text" class="form-control" value="' + pmail + '"readonly><br/>';
			html += '<strong>Patient Contact</strong>: <input type="text" class="form-control" value="' + pcont + '"readonly><br/>';
			html += '<strong>Patient Address</strong>: <input type="text" class="form-control" value="' + padd1 + '"readonly><br/>';
			html += '<strong>Consulted Doctor</strong>: <input type="text" class="form-control" value="' + pcslt + '" readonly><br/>';

			html += '<span class="errorAddress"></span>';
			html += '</div>';
			html += '</div>';
			html += '</div>';

			$('#patientRow').append(html);

			$("#p_id").val('')
		} else {
			console.log(error);
			toastr.error("Something went wrong. Look in the console for more information");
		}
	});
}

function getDoctorDetails(d_id) {
	$('#dotRow').text('');
	$('.success2').val('');

	mContract.getDoctorDetails(d_id, function (error, data) {
		if (!error) {
			$('.success2').append("Success: Doctor's information has been displayed in Doctor details's table!!!");
			let dname1 = data[0];
			let dmail = data[1];
			let dcont = data[2];
			let dedu1 = data[3];
			let dadd1 = data[4];

			let html = '<div class="col-sm-6 col-md-4 col-lg-3">';

			html += '<div class="panel panel-default jumbotron">';
			html += '<div class = "centerAlign">Doctor Details</div>';
			html += '<div class="panel-body padding0">'
			html += '<strong>Doctor Name</strong>: <input type="text" class="form-control" value="' + dname1 + '"readonly><br/>';
			html += '<strong>Doctor Email</strong>: <input type="text" class="form-control" value="' + dmail + '"readonly><br/>';
			html += '<strong>Doctor Contact</strong>: <input type="text" class="form-control" value="' + dcont + '"readonly><br/>';
			html += '<strong>Doctor Education</strong>: <input type="text" class="form-control" value="' + dedu1 + '"readonly><br/>';
			html += '<strong>Doctor Address</strong>: <input type="text" class="form-control" value="' + dadd1 + '" readonly><br/>';
			html += '<span class="errorAddress"></span>';
			html += '</div>';
			html += '</div>';
			html += '</div>';

			$('#dotRow').append(html);
			$("#d_id").val('');
		} else {
			console.log(error);
			toastr.error("Something went wrong. Look in the console for more information");
		}
	});
}

$("#addDetails").on("click", function () {
	$(".error1").text('');
	let did = $("#did").val();
	if (!did) {
		$(".error1").text('Please enter a valid id');
		return;
	}

	$(".error2").text('');
	let dname = $("#dname").val();
	if (!dname) {
		$(".error2").text('Please enter a valid name');
		return;
	}

	$(".error3").text('');
	let demail = $("#demail").val();
	if (!demail) {
		$(".error3").text('Please enter a valid email address');
		return;
	}

	$(".error4").text('');
	let dcnum = $("#dcnum").val();
	if (!dcnum) {
		$(".error4").text('Please enter a valid contact number');
		return;
	}
	if (dcnum.length !== 10) {
		$(".error4").text('Please enter 10 digit contact number');
		return;
	}

	$(".error5").text('');
	let dedu = $("#dedu").val();
	if (!dedu) {
		$(".error5").text('Please enter a valid address');
		return;
	}

	$(".error6").text('');
	let dadd = $("#dadd").val();
	if (!dadd) {
		$(".error6").text('Please enter a valid address');
		return;
	}

	setDoctorDetails(did, dname, demail, dcnum, dedu, dadd);
});


$("#addPatientDetails").on("click", function () {
	$(".error7").text('');
	let pid = $("#pid").val();
	if (!pid) {
		$(".error7").text('Please enter a valid id');
		return;
	}

	$(".error8").text('');
	let pname = $("#pname").val();
	if (!pname) {
		$(".error8").text('Please enter a valid name');
		return;
	}

	$(".error9").text('');
	let pemail = $("#pemail").val();
	if (!pemail) {
		$(".error9").text('Please enter a valid email address');
		return;
	}

	$(".error10").text('');
	let pcnum = $("#pcnum").val();
	if (!pcnum) {
		$(".error10").text('Please enter a valid contact number');
		return;
	}
	if (pcnum.length !== 10) {
		$(".error10").text('Please enter 10 digit contact number');
		return;
	}

	$(".error11").text('');
	let padd = $("#padd").val();
	if (!padd) {
		$(".error11").text('Please enter a valid address');
		return;
	}

	$(".error12").text('');
	let pcd = $("#pcd").val();
	if (!pcd) {
		$(".error12").text('Please write a valid consulted doctor');
		return;
	}

	setPatientDetails(pid, pname, pemail, pcnum, padd, pcd);
});


$("#btnGetDoctorDetails").on("click", function () {
	$(".error13").text('');

	let d_id = $("#d_id").val();
	if (!d_id) {
		$(".error13").text('Please enter a Doctor Id');
		return;
	}

	getDoctorDetails(d_id);
});

$("#btnGetPatientDetails").on("click", function () {
	$(".error14").text('');

	let p_id = $("#p_id").val();
	if (!p_id) {
		$(".error14").text('Please enter a Patient Id');
		return;
	}

	getPatientDetails(p_id);
});


$("#btnSetToken").on("click", function () {
	$(".error15").text('');
	
	let t_add = $("#t_add").val();
	if (!t_add) {
		$(".error16").text('Please enter a addres to whome you want to send token');
		return;
	}

	$(".error16").text('');
	let t_val = $("#t_val").val();
	if (!t_val) {
		$(".error15").text('Please enter a number of Token to be send');
		return;
	}

	Transfer(t_add, t_val);
});
