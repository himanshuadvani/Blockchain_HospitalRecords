pragma solidity ^0.5.0;

import "./ERC20Interface.sol";

contract medicalRecords is ERC20Interface {
    
    struct Doctor{
        string doctorName;
        string doctorEmail;
        uint doctorContNum;
        string doctorEducation;
        string doctorLocalAddress;
    }
    
    struct Patient{
        string patientName;
        string patientEmail;
        uint patientContNum;
        string patientLocalAddress;
        uint consultedDoctor;
    }
    
    address public OwnerOfHospital;
    
    mapping(uint => Doctor) doctorInfo;
    mapping(uint => Patient) patientInfo;
    mapping(uint => bool) isRecordExist;
    mapping(address => bool) isDoctorValid;
    mapping(address => bool) isPatientValid;
    
    uint256 constant private MAX_UINT256 = 2**256 - 1;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    
    string public name;                                  //Token name: Medical Token
    uint8 public decimals;                               //How many decimals to show.
    string public symbol;                                //An identifier: MEDToken
    
    constructor() public  {
        OwnerOfHospital = msg.sender;
        
        balances[msg.sender] = 10000;                    // Give the creator all initial tokens
        totalSupply = 10000;                             // Update total supply
        name = "Medical Token";                          // Set the name for display purposes
        decimals = 0;                                    // Amount of decimals for display purposes
        symbol = "MEDToken";                             // Set the symbol for display purposes
    }
    
    modifier onlyHospitalOwner {
        require(msg.sender == OwnerOfHospital, "Only Hospital owner can add the Doctor details into the record!");
        _;
    }
    
    function setDoctorDetails(uint _dId, string memory _dName, string memory _dEmail, uint _dContNum, string memory _dEducation, string memory _dAdd) onlyHospitalOwner public {   //Set the details of doctors
        Doctor storage d = doctorInfo[_dId];
        
        d.doctorName = _dName;
        d.doctorEmail = _dEmail;
        d.doctorContNum = _dContNum;
        d.doctorEducation = _dEducation;
        d.doctorLocalAddress = _dAdd;
        
        isDoctorValid[msg.sender] = true;
        isRecordExist[_dId] = true;
    }
    
    function setPatientDetails(uint _pId, string memory _pName, string memory _pEmail, uint _pContNum, string memory _padd, uint _consultedDoctor)  onlyHospitalOwner public returns(bool) {   //This function is used to set the patient details.
        Patient storage p = patientInfo[_pId];
              
        p.patientName = _pName;
        p.patientEmail = _pEmail;
        p.patientContNum = _pContNum;
        p.patientLocalAddress = _padd;
        p.consultedDoctor = _consultedDoctor;
    
        isPatientValid[msg.sender] = true;
        isRecordExist[_pId] = true;
              
        return true;
    }
    
    function getDoctorDetails(uint _dId) public view returns(string memory, string memory, uint, string memory, string memory) {    //Get doctor details
        Doctor memory s = doctorInfo[_dId];
        require(isRecordExist[_dId] == true && (msg.sender == OwnerOfHospital || isDoctorValid[msg.sender] ==  true), "Only Doctor/OwnerOfHospital/receptionist can see doctors information");
        return (s.doctorName,
                s.doctorEmail,
                s.doctorContNum,
                s.doctorEducation,
                s.doctorLocalAddress
            );
    }
    
    function getPatientInfo(uint _pId) public view returns(string memory, string memory, uint, string memory, uint) {    //Get Patient details.
        Patient memory a = patientInfo[_pId];
        require(isRecordExist[_pId] == true &&(isPatientValid[msg.sender] == true || isDoctorValid[msg.sender] == true), "Only Patient/Doctor/ can see his/her information");
        return (a.patientName,
                a.patientEmail,
                a.patientContNum,
                a.patientLocalAddress,
                a.consultedDoctor
        );
    }
    
    function transfer(address _to, uint256 _value) public returns (bool success) {  
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value); 
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        uint256 allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && allowance >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        emit Transfer(_from, _to, _value); 
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); 
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
    
}
