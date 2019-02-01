// This file is generated by rust-protobuf 2.2.4. Do not edit
// @generated

// https://github.com/Manishearth/rust-clippy/issues/702
#![allow(unknown_lints)]
#![allow(clippy)]

#![cfg_attr(rustfmt, rustfmt_skip)]

#![allow(box_pointers)]
#![allow(dead_code)]
#![allow(missing_docs)]
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
#![allow(non_upper_case_globals)]
#![allow(trivial_casts)]
#![allow(unsafe_code)]
#![allow(unused_imports)]
#![allow(unused_results)]

use protobuf::Message as Message_imported_for_functions;
use protobuf::ProtobufEnum as ProtobufEnum_imported_for_functions;

#[derive(PartialEq,Clone,Default)]
pub struct Proposal {
    // message fields
    pub record_id: ::std::string::String,
    pub timestamp: u64,
    pub issuing_account: ::std::string::String,
    pub receiving_account: ::std::string::String,
    pub role: Proposal_Role,
    pub properties: ::protobuf::RepeatedField<::std::string::String>,
    pub status: Proposal_Status,
    pub terms: ::std::string::String,
    // special fields
    pub unknown_fields: ::protobuf::UnknownFields,
    pub cached_size: ::protobuf::CachedSize,
}

impl Proposal {
    pub fn new() -> Proposal {
        ::std::default::Default::default()
    }

    // string record_id = 1;

    pub fn clear_record_id(&mut self) {
        self.record_id.clear();
    }

    // Param is passed by value, moved
    pub fn set_record_id(&mut self, v: ::std::string::String) {
        self.record_id = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_record_id(&mut self) -> &mut ::std::string::String {
        &mut self.record_id
    }

    // Take field
    pub fn take_record_id(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.record_id, ::std::string::String::new())
    }

    pub fn get_record_id(&self) -> &str {
        &self.record_id
    }

    // uint64 timestamp = 2;

    pub fn clear_timestamp(&mut self) {
        self.timestamp = 0;
    }

    // Param is passed by value, moved
    pub fn set_timestamp(&mut self, v: u64) {
        self.timestamp = v;
    }

    pub fn get_timestamp(&self) -> u64 {
        self.timestamp
    }

    // string issuing_account = 3;

    pub fn clear_issuing_account(&mut self) {
        self.issuing_account.clear();
    }

    // Param is passed by value, moved
    pub fn set_issuing_account(&mut self, v: ::std::string::String) {
        self.issuing_account = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_issuing_account(&mut self) -> &mut ::std::string::String {
        &mut self.issuing_account
    }

    // Take field
    pub fn take_issuing_account(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.issuing_account, ::std::string::String::new())
    }

    pub fn get_issuing_account(&self) -> &str {
        &self.issuing_account
    }

    // string receiving_account = 4;

    pub fn clear_receiving_account(&mut self) {
        self.receiving_account.clear();
    }

    // Param is passed by value, moved
    pub fn set_receiving_account(&mut self, v: ::std::string::String) {
        self.receiving_account = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_receiving_account(&mut self) -> &mut ::std::string::String {
        &mut self.receiving_account
    }

    // Take field
    pub fn take_receiving_account(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.receiving_account, ::std::string::String::new())
    }

    pub fn get_receiving_account(&self) -> &str {
        &self.receiving_account
    }

    // .Proposal.Role role = 5;

    pub fn clear_role(&mut self) {
        self.role = Proposal_Role::OWNER;
    }

    // Param is passed by value, moved
    pub fn set_role(&mut self, v: Proposal_Role) {
        self.role = v;
    }

    pub fn get_role(&self) -> Proposal_Role {
        self.role
    }

    // repeated string properties = 6;

    pub fn clear_properties(&mut self) {
        self.properties.clear();
    }

    // Param is passed by value, moved
    pub fn set_properties(&mut self, v: ::protobuf::RepeatedField<::std::string::String>) {
        self.properties = v;
    }

    // Mutable pointer to the field.
    pub fn mut_properties(&mut self) -> &mut ::protobuf::RepeatedField<::std::string::String> {
        &mut self.properties
    }

    // Take field
    pub fn take_properties(&mut self) -> ::protobuf::RepeatedField<::std::string::String> {
        ::std::mem::replace(&mut self.properties, ::protobuf::RepeatedField::new())
    }

    pub fn get_properties(&self) -> &[::std::string::String] {
        &self.properties
    }

    // .Proposal.Status status = 7;

    pub fn clear_status(&mut self) {
        self.status = Proposal_Status::OPEN;
    }

    // Param is passed by value, moved
    pub fn set_status(&mut self, v: Proposal_Status) {
        self.status = v;
    }

    pub fn get_status(&self) -> Proposal_Status {
        self.status
    }

    // string terms = 8;

    pub fn clear_terms(&mut self) {
        self.terms.clear();
    }

    // Param is passed by value, moved
    pub fn set_terms(&mut self, v: ::std::string::String) {
        self.terms = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_terms(&mut self) -> &mut ::std::string::String {
        &mut self.terms
    }

    // Take field
    pub fn take_terms(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.terms, ::std::string::String::new())
    }

    pub fn get_terms(&self) -> &str {
        &self.terms
    }
}

impl ::protobuf::Message for Proposal {
    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream) -> ::protobuf::ProtobufResult<()> {
        while !is.eof()? {
            let (field_number, wire_type) = is.read_tag_unpack()?;
            match field_number {
                1 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.record_id)?;
                },
                2 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_uint64()?;
                    self.timestamp = tmp;
                },
                3 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.issuing_account)?;
                },
                4 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.receiving_account)?;
                },
                5 => {
                    ::protobuf::rt::read_proto3_enum_with_unknown_fields_into(wire_type, is, &mut self.role, 5, &mut self.unknown_fields)?
                },
                6 => {
                    ::protobuf::rt::read_repeated_string_into(wire_type, is, &mut self.properties)?;
                },
                7 => {
                    ::protobuf::rt::read_proto3_enum_with_unknown_fields_into(wire_type, is, &mut self.status, 7, &mut self.unknown_fields)?
                },
                8 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.terms)?;
                },
                _ => {
                    ::protobuf::rt::read_unknown_or_skip_group(field_number, wire_type, is, self.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u32 {
        let mut my_size = 0;
        if !self.record_id.is_empty() {
            my_size += ::protobuf::rt::string_size(1, &self.record_id);
        }
        if self.timestamp != 0 {
            my_size += ::protobuf::rt::value_size(2, self.timestamp, ::protobuf::wire_format::WireTypeVarint);
        }
        if !self.issuing_account.is_empty() {
            my_size += ::protobuf::rt::string_size(3, &self.issuing_account);
        }
        if !self.receiving_account.is_empty() {
            my_size += ::protobuf::rt::string_size(4, &self.receiving_account);
        }
        if self.role != Proposal_Role::OWNER {
            my_size += ::protobuf::rt::enum_size(5, self.role);
        }
        for value in &self.properties {
            my_size += ::protobuf::rt::string_size(6, &value);
        };
        if self.status != Proposal_Status::OPEN {
            my_size += ::protobuf::rt::enum_size(7, self.status);
        }
        if !self.terms.is_empty() {
            my_size += ::protobuf::rt::string_size(8, &self.terms);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if !self.record_id.is_empty() {
            os.write_string(1, &self.record_id)?;
        }
        if self.timestamp != 0 {
            os.write_uint64(2, self.timestamp)?;
        }
        if !self.issuing_account.is_empty() {
            os.write_string(3, &self.issuing_account)?;
        }
        if !self.receiving_account.is_empty() {
            os.write_string(4, &self.receiving_account)?;
        }
        if self.role != Proposal_Role::OWNER {
            os.write_enum(5, self.role.value())?;
        }
        for v in &self.properties {
            os.write_string(6, &v)?;
        };
        if self.status != Proposal_Status::OPEN {
            os.write_enum(7, self.status.value())?;
        }
        if !self.terms.is_empty() {
            os.write_string(8, &self.terms)?;
        }
        os.write_unknown_fields(self.get_unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn get_cached_size(&self) -> u32 {
        self.cached_size.get()
    }

    fn get_unknown_fields(&self) -> &::protobuf::UnknownFields {
        &self.unknown_fields
    }

    fn mut_unknown_fields(&mut self) -> &mut ::protobuf::UnknownFields {
        &mut self.unknown_fields
    }

    fn as_any(&self) -> &::std::any::Any {
        self as &::std::any::Any
    }
    fn as_any_mut(&mut self) -> &mut ::std::any::Any {
        self as &mut ::std::any::Any
    }
    fn into_any(self: Box<Self>) -> ::std::boxed::Box<::std::any::Any> {
        self
    }

    fn descriptor(&self) -> &'static ::protobuf::reflect::MessageDescriptor {
        Self::descriptor_static()
    }

    fn new() -> Proposal {
        Proposal::new()
    }

    fn descriptor_static() -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "record_id",
                    |m: &Proposal| { &m.record_id },
                    |m: &mut Proposal| { &mut m.record_id },
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeUint64>(
                    "timestamp",
                    |m: &Proposal| { &m.timestamp },
                    |m: &mut Proposal| { &mut m.timestamp },
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "issuing_account",
                    |m: &Proposal| { &m.issuing_account },
                    |m: &mut Proposal| { &mut m.issuing_account },
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "receiving_account",
                    |m: &Proposal| { &m.receiving_account },
                    |m: &mut Proposal| { &mut m.receiving_account },
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeEnum<Proposal_Role>>(
                    "role",
                    |m: &Proposal| { &m.role },
                    |m: &mut Proposal| { &mut m.role },
                ));
                fields.push(::protobuf::reflect::accessor::make_repeated_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "properties",
                    |m: &Proposal| { &m.properties },
                    |m: &mut Proposal| { &mut m.properties },
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeEnum<Proposal_Status>>(
                    "status",
                    |m: &Proposal| { &m.status },
                    |m: &mut Proposal| { &mut m.status },
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "terms",
                    |m: &Proposal| { &m.terms },
                    |m: &mut Proposal| { &mut m.terms },
                ));
                ::protobuf::reflect::MessageDescriptor::new::<Proposal>(
                    "Proposal",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }

    fn default_instance() -> &'static Proposal {
        static mut instance: ::protobuf::lazy::Lazy<Proposal> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const Proposal,
        };
        unsafe {
            instance.get(Proposal::new)
        }
    }
}

impl ::protobuf::Clear for Proposal {
    fn clear(&mut self) {
        self.clear_record_id();
        self.clear_timestamp();
        self.clear_issuing_account();
        self.clear_receiving_account();
        self.clear_role();
        self.clear_properties();
        self.clear_status();
        self.clear_terms();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for Proposal {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for Proposal {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(Clone,PartialEq,Eq,Debug,Hash)]
pub enum Proposal_Role {
    OWNER = 0,
    CUSTODIAN = 1,
    REPORTER = 2,
}

impl ::protobuf::ProtobufEnum for Proposal_Role {
    fn value(&self) -> i32 {
        *self as i32
    }

    fn from_i32(value: i32) -> ::std::option::Option<Proposal_Role> {
        match value {
            0 => ::std::option::Option::Some(Proposal_Role::OWNER),
            1 => ::std::option::Option::Some(Proposal_Role::CUSTODIAN),
            2 => ::std::option::Option::Some(Proposal_Role::REPORTER),
            _ => ::std::option::Option::None
        }
    }

    fn values() -> &'static [Self] {
        static values: &'static [Proposal_Role] = &[
            Proposal_Role::OWNER,
            Proposal_Role::CUSTODIAN,
            Proposal_Role::REPORTER,
        ];
        values
    }

    fn enum_descriptor_static() -> &'static ::protobuf::reflect::EnumDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::EnumDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::EnumDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                ::protobuf::reflect::EnumDescriptor::new("Proposal_Role", file_descriptor_proto())
            })
        }
    }
}

impl ::std::marker::Copy for Proposal_Role {
}

impl ::std::default::Default for Proposal_Role {
    fn default() -> Self {
        Proposal_Role::OWNER
    }
}

impl ::protobuf::reflect::ProtobufValue for Proposal_Role {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Enum(self.descriptor())
    }
}

#[derive(Clone,PartialEq,Eq,Debug,Hash)]
pub enum Proposal_Status {
    OPEN = 0,
    ACCEPTED = 1,
    REJECTED = 2,
    CANCELED = 3,
}

impl ::protobuf::ProtobufEnum for Proposal_Status {
    fn value(&self) -> i32 {
        *self as i32
    }

    fn from_i32(value: i32) -> ::std::option::Option<Proposal_Status> {
        match value {
            0 => ::std::option::Option::Some(Proposal_Status::OPEN),
            1 => ::std::option::Option::Some(Proposal_Status::ACCEPTED),
            2 => ::std::option::Option::Some(Proposal_Status::REJECTED),
            3 => ::std::option::Option::Some(Proposal_Status::CANCELED),
            _ => ::std::option::Option::None
        }
    }

    fn values() -> &'static [Self] {
        static values: &'static [Proposal_Status] = &[
            Proposal_Status::OPEN,
            Proposal_Status::ACCEPTED,
            Proposal_Status::REJECTED,
            Proposal_Status::CANCELED,
        ];
        values
    }

    fn enum_descriptor_static() -> &'static ::protobuf::reflect::EnumDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::EnumDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::EnumDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                ::protobuf::reflect::EnumDescriptor::new("Proposal_Status", file_descriptor_proto())
            })
        }
    }
}

impl ::std::marker::Copy for Proposal_Status {
}

impl ::std::default::Default for Proposal_Status {
    fn default() -> Self {
        Proposal_Status::OPEN
    }
}

impl ::protobuf::reflect::ProtobufValue for Proposal_Status {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Enum(self.descriptor())
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct ProposalContainer {
    // message fields
    pub entries: ::protobuf::RepeatedField<Proposal>,
    // special fields
    pub unknown_fields: ::protobuf::UnknownFields,
    pub cached_size: ::protobuf::CachedSize,
}

impl ProposalContainer {
    pub fn new() -> ProposalContainer {
        ::std::default::Default::default()
    }

    // repeated .Proposal entries = 1;

    pub fn clear_entries(&mut self) {
        self.entries.clear();
    }

    // Param is passed by value, moved
    pub fn set_entries(&mut self, v: ::protobuf::RepeatedField<Proposal>) {
        self.entries = v;
    }

    // Mutable pointer to the field.
    pub fn mut_entries(&mut self) -> &mut ::protobuf::RepeatedField<Proposal> {
        &mut self.entries
    }

    // Take field
    pub fn take_entries(&mut self) -> ::protobuf::RepeatedField<Proposal> {
        ::std::mem::replace(&mut self.entries, ::protobuf::RepeatedField::new())
    }

    pub fn get_entries(&self) -> &[Proposal] {
        &self.entries
    }
}

impl ::protobuf::Message for ProposalContainer {
    fn is_initialized(&self) -> bool {
        for v in &self.entries {
            if !v.is_initialized() {
                return false;
            }
        };
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream) -> ::protobuf::ProtobufResult<()> {
        while !is.eof()? {
            let (field_number, wire_type) = is.read_tag_unpack()?;
            match field_number {
                1 => {
                    ::protobuf::rt::read_repeated_message_into(wire_type, is, &mut self.entries)?;
                },
                _ => {
                    ::protobuf::rt::read_unknown_or_skip_group(field_number, wire_type, is, self.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u32 {
        let mut my_size = 0;
        for value in &self.entries {
            let len = value.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        };
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        for v in &self.entries {
            os.write_tag(1, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        };
        os.write_unknown_fields(self.get_unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn get_cached_size(&self) -> u32 {
        self.cached_size.get()
    }

    fn get_unknown_fields(&self) -> &::protobuf::UnknownFields {
        &self.unknown_fields
    }

    fn mut_unknown_fields(&mut self) -> &mut ::protobuf::UnknownFields {
        &mut self.unknown_fields
    }

    fn as_any(&self) -> &::std::any::Any {
        self as &::std::any::Any
    }
    fn as_any_mut(&mut self) -> &mut ::std::any::Any {
        self as &mut ::std::any::Any
    }
    fn into_any(self: Box<Self>) -> ::std::boxed::Box<::std::any::Any> {
        self
    }

    fn descriptor(&self) -> &'static ::protobuf::reflect::MessageDescriptor {
        Self::descriptor_static()
    }

    fn new() -> ProposalContainer {
        ProposalContainer::new()
    }

    fn descriptor_static() -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_repeated_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<Proposal>>(
                    "entries",
                    |m: &ProposalContainer| { &m.entries },
                    |m: &mut ProposalContainer| { &mut m.entries },
                ));
                ::protobuf::reflect::MessageDescriptor::new::<ProposalContainer>(
                    "ProposalContainer",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }

    fn default_instance() -> &'static ProposalContainer {
        static mut instance: ::protobuf::lazy::Lazy<ProposalContainer> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ProposalContainer,
        };
        unsafe {
            instance.get(ProposalContainer::new)
        }
    }
}

impl ::protobuf::Clear for ProposalContainer {
    fn clear(&mut self) {
        self.clear_entries();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for ProposalContainer {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for ProposalContainer {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

static file_descriptor_proto_data: &'static [u8] = b"\
    \n\x0eproposal.proto\"\x8d\x03\n\x08Proposal\x12\x1b\n\trecord_id\x18\
    \x01\x20\x01(\tR\x08recordId\x12\x1c\n\ttimestamp\x18\x02\x20\x01(\x04R\
    \ttimestamp\x12'\n\x0fissuing_account\x18\x03\x20\x01(\tR\x0eissuingAcco\
    unt\x12+\n\x11receiving_account\x18\x04\x20\x01(\tR\x10receivingAccount\
    \x12\"\n\x04role\x18\x05\x20\x01(\x0e2\x0e.Proposal.RoleR\x04role\x12\
    \x1e\n\nproperties\x18\x06\x20\x03(\tR\nproperties\x12(\n\x06status\x18\
    \x07\x20\x01(\x0e2\x10.Proposal.StatusR\x06status\x12\x14\n\x05terms\x18\
    \x08\x20\x01(\tR\x05terms\".\n\x04Role\x12\t\n\x05OWNER\x10\0\x12\r\n\tC\
    USTODIAN\x10\x01\x12\x0c\n\x08REPORTER\x10\x02\"<\n\x06Status\x12\x08\n\
    \x04OPEN\x10\0\x12\x0c\n\x08ACCEPTED\x10\x01\x12\x0c\n\x08REJECTED\x10\
    \x02\x12\x0c\n\x08CANCELED\x10\x03\"8\n\x11ProposalContainer\x12#\n\x07e\
    ntries\x18\x01\x20\x03(\x0b2\t.ProposalR\x07entriesb\x06proto3\
";

static mut file_descriptor_proto_lazy: ::protobuf::lazy::Lazy<::protobuf::descriptor::FileDescriptorProto> = ::protobuf::lazy::Lazy {
    lock: ::protobuf::lazy::ONCE_INIT,
    ptr: 0 as *const ::protobuf::descriptor::FileDescriptorProto,
};

fn parse_descriptor_proto() -> ::protobuf::descriptor::FileDescriptorProto {
    ::protobuf::parse_from_bytes(file_descriptor_proto_data).unwrap()
}

pub fn file_descriptor_proto() -> &'static ::protobuf::descriptor::FileDescriptorProto {
    unsafe {
        file_descriptor_proto_lazy.get(|| {
            parse_descriptor_proto()
        })
    }
}
