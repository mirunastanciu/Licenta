package com.test.app.ticket;

import java.sql.Date;
import java.text.ParseException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.test.app.client.ClientService;
import com.test.app.employee.Employee;
import com.test.app.employee.EmployeeService;
import com.test.app.projecttype.ProjectTypeService;
import com.test.app.specialisation.SpecialisationService;
import com.test.app.ticketstatus.TicketStatusService;

@RestController
public class TicketController {

	@Autowired
	TicketService ticketService;

	@Autowired
	ProjectTypeService projectTypetService;

	@Autowired
	EmployeeService employeeService;

	@Autowired
	TicketStatusService ticketStatusService;

	@Autowired
	ClientService clientService;

	@Autowired
	SpecialisationService specialisationService;
	

	@RequestMapping(path = "/ticketsToDo", method = RequestMethod.GET)
	public List<TicketDetails> getAllTicketsToDo() {
		List<Ticket> ttodo = ticketService.getTicketsToDo();
		List<TicketDetails> td = new ArrayList<>();

		for(int i=0;i<ttodo.size();i++){

				TicketDetails tkd = new TicketDetails();
				tkd.setIdticket(ttodo.get(i).getId());
				tkd.setDescription(ttodo.get(i).getDescription());
				tkd.setProjecttypename(projectTypetService.getProjectTypeById(ttodo.get(i).getProjcttype()).getProjtypename());
				tkd.setDuedate(ttodo.get(i).getDuedate());
				tkd.setStatus(ticketStatusService.getTicketStatusById(ttodo.get(i).getIdstatus()).getStatusname());
				td.add(tkd);
			}
		
		return td;
	}

	@RequestMapping(path = "/ticketsInProgress", method = RequestMethod.GET)
	public List<TicketDetails> getAllTicketsAssigned() {
		List<Ticket> tInProgress = ticketService.getTicketsInProgress();
		List<TicketDetails> td = new ArrayList<>();
		for(int i=0;i<tInProgress.size();i++){
			
				TicketDetails tkd = new TicketDetails();
				tkd.setIdticket(tInProgress.get(i).getId());
				tkd.setDescription(tInProgress.get(i).getDescription());
				tkd.setProjecttypename(projectTypetService.getProjectTypeById(tInProgress.get(i).getProjcttype()).getProjtypename());
				tkd.setDuedate(tInProgress.get(i).getDuedate());
				tkd.setStatus(ticketStatusService.getTicketStatusById(tInProgress.get(i).getIdstatus()).getStatusname());
				td.add(tkd);
			}
		
		return td;
	}

	@RequestMapping(path = "/ticketsDone", method = RequestMethod.GET)
	public List<TicketDetails> getAllTicketsDone() {
		List<Ticket> tDone = ticketService.getTicketsDone();
		List<TicketDetails> td = new ArrayList<>();
		for(int i=0;i<tDone.size();i++) {
				TicketDetails tkd = new TicketDetails();
				tkd.setIdticket(tDone.get(i).getId());
				tkd.setDescription(tDone.get(i).getDescription());
				tkd.setProjecttypename(projectTypetService.getProjectTypeById(tDone.get(i).getProjcttype()).getProjtypename());
				tkd.setDuedate(tDone.get(i).getDuedate());
				tkd.setStatus(ticketStatusService.getTicketStatusById(tDone.get(i).getIdstatus()).getStatusname());
				td.add(tkd);
			}

		
		return td;
	}

	@RequestMapping(value = "/addTicket")
	public ModelAndView addTicket(@RequestParam("projecttype") String projecttype ,
							@RequestParam("description") String description,
							@RequestParam("assignpersson") String assignpersson,
							@RequestParam("duedate") Date duedate){
		Ticket t = new Ticket();
		t.setDescription(description);
		t.setProjcttype(projectTypetService.getIdProjectTypeByName(projecttype));
		t.setIdemployee(getIdEmployeeByName(assignpersson));
		t.setDuedate(duedate);
		t.setIdclient(1);
        t.setCreationdate(Date.valueOf(LocalDate.now()));
		t.setIdstatus(1);
		
		ticketService.addTicket(t);
		ModelAndView model = new ModelAndView("redirect:/administratorStartPage");
		return model;



	}
	
	@RequestMapping(value = "/updateTicket" , method=RequestMethod.POST)
	public ModelAndView updateTicket(@RequestParam(value="idTicket") int idTicket ,
							@RequestParam(value="projecttype") String projecttype,
							@RequestParam(value="status") String status,
							@RequestParam(value="projectdescription") String projectdescription,
							@RequestParam(value="duedate") String duedate,
							@RequestParam(value="startdate") String startdate,
							@RequestParam(value="finishdate") String finishdate,
							@RequestParam(value="employeename") String employeename) throws ParseException{
		Ticket t = ticketService.getTicketById(idTicket);
		t.setId(idTicket);
		t.setDescription(projectdescription);
		t.setProjcttype(projectTypetService.getIdProjectTypeByName(projecttype));
		t.setIdemployee(getIdEmployeeByName(employeename));

		if(duedate.equals("")==false){
			   java.sql.Date parseDate = java.sql.Date.valueOf(duedate);
			   t.setDuedate(parseDate);
		}

		if(startdate.equals("")==false){
			java.sql.Date parseDate = java.sql.Date.valueOf(startdate);
			   t.setStartdate(parseDate);
		}

		if(finishdate.equals("")==false){
			java.sql.Date parseDate = java.sql.Date.valueOf(finishdate);
			   t.setFinishdate(parseDate);
		}

		t.setIdstatus(ticketStatusService.getStatusIdByName(status));
		ticketService.addTicket(t);

		ModelAndView model = new ModelAndView("redirect:/administratorStartPage");
		return model;
	}


	public int getIdEmployeeByName(String a){
		List<Employee> l = employeeService.getAllEmployies();
		for(int i=0;i<l.size();i++){
			String fl = l.get(i).getFirstname()+" "+l.get(i).getLastname();
			if(fl.equals(a)){
				return l.get(i).getId();
			}
		}
		return 0;
	}


	 @ResponseBody
	 @RequestMapping(value ="/getDetailsByIdTicket" , method=RequestMethod.POST )
	 public TicketDetails getDetailsByIdTicket(@RequestParam(value = "idTicket") int id) {

		 Ticket tk = ticketService.getTicketById(id);
		 TicketDetails tkd = new TicketDetails();
		 tkd.setIdticket(tk.getId());
		 tkd.setProjecttypename(projectTypetService.getProjectTypeById(tk.getProjcttype()).getProjtypename());
		 tkd.setStatus(ticketStatusService.getTicketStatusById(tk.getIdstatus()).getStatusname());
		 String employeeName = employeeService.getEmployeeById(tk.getIdemployee()).getFirstname()
				 +" "+employeeService.getEmployeeById(tk.getIdemployee()).getLastname();
		 tkd.setEmployeename(employeeName);
		 tkd.setEmployeeemail( employeeService.getEmployeeById(tk.getIdemployee()).getEmail());
		 tkd.setEmployeespecialisation(specialisationService.getSpecialisationById((employeeService.getEmployeeById(tk.getIdemployee())).getIdspecialisation()).getName());
		 String clientName = clientService.getClientById(tk.getIdclient()).getFirstname()
				 +" "+clientService.getClientById(tk.getIdclient()).getLastname();
		 tkd.setClientname(clientName);
		 tkd.setClientemail(clientService.getClientById(tk.getIdclient()).getEmail());
		 tkd.setCreationdate(tk.getCreationdate());
		 tkd.setDuedate(tk.getDuedate());
		 tkd.setStartdate(tk.getStartdate());
		 tkd.setFinishdate(tk.getFinishdate());
		 tkd.setDescription(tk.getDescription());
		return tkd;

	    }
	 
	 @RequestMapping(value ="/deleteTicket" , method=RequestMethod.POST )
	 public void deleteTicket(@RequestParam(value = "idTicket") int id){
		
		 ticketService.delete(ticketService.getTicketById(id));
	 }



}
