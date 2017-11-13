package com.test.app.ticket;

import java.sql.Date;
import java.util.Iterator;
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
import com.test.app.projecttype.ProjectType;
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
	
	
	
	

	@RequestMapping("/newTicketPage")
	public ModelAndView getAdminPage() {
		ModelAndView m = new ModelAndView("RegisterProject");
		return m;
	}

	@RequestMapping(path = "/ticketsToDo", method = RequestMethod.GET)
	public List<Ticket> getAllTicketsToDo() {
		List<Ticket> l = ticketService.getAllTickets();
		Iterator<Ticket> it = l.iterator();
		while (it.hasNext()) {
			Ticket t = it.next();
			if (t.getIdstatus() != 1) {
				it.remove();
			}
		}
		return l;
	}

	@RequestMapping(path = "/ticketsInProgress", method = RequestMethod.GET)
	public List<Ticket> getAllTicketsAssigned() {
		List<Ticket> l = ticketService.getAllTickets();
		Iterator<Ticket> it = l.iterator();
		while (it.hasNext()) {
			Ticket t = it.next();
			if (t.getIdstatus() != 2 && t.getIdstatus() != 3
					&& t.getIdstatus() != 4) {
				it.remove();
			}
		}
		return l;
	}

	@RequestMapping(path = "/ticketsDone", method = RequestMethod.GET)
	public List<Ticket> getAllTicketsDone() {
		List<Ticket> l = ticketService.getAllTickets();
		Iterator<Ticket> it = l.iterator();
		while (it.hasNext()) {
			Ticket t = it.next();
			if (t.getIdstatus() != 5) {
				it.remove();
			}

		}
		return l;
	}
	
	@RequestMapping(value = "/addTicket")
	public ModelAndView addTicket(@RequestParam("projecttype") String projecttype ,
							@RequestParam("description") String description,
							@RequestParam("assignpersson") String assignpersson,
							@RequestParam("duedate") Date duedate){
		Ticket t = new Ticket();
		t.setDescription(description);
		t.setProjcttype(getIdProjectTypeByName(projecttype));
		t.setIdemployee(getIdEmployeeByName(assignpersson));
		t.setDuedate(duedate);
		t.setIdclient(1);
		
		t.setIdstatus(1);
		
		ModelAndView model = new ModelAndView("redirect:/administratorStartPage");
		return model;
		
		
		
	}

	
	public int getIdProjectTypeByName(String a){
		List<ProjectType> l = projectTypetService.getAllProjectTypes();
		for(int i=0;i<l.size();i++){
			if(l.get(i).getProjtypename().equals(a)){
				return l.get(i).getId();
			}
		}
		return 0;
		
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
	
	@RequestMapping(path = "/getTicketById")
	public TicketDetails getTicketById(){
		 Ticket t = ticketService.getTicketById(4);		 
		 TicketDetails tkd = new TicketDetails();
		 tkd.setStatus(ticketStatusService.getTicketStatusById(t.getIdstatus()).getStatusname());
		
		 return tkd;
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
		 String clientName = clientService.getClientById(tk.getIdclient()).getFisrtname()
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


}
