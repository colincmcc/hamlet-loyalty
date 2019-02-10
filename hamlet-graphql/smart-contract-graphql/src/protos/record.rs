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
pub struct Record {
    // message fields
    pub record_id: ::std::string::String,
    pub record_type: ::std::string::String,
    pub owners: ::protobuf::RepeatedField<Record_AssociatedAccount>,
    pub custodians: ::protobuf::RepeatedField<Record_AssociatedAccount>,
    pub field_final: bool,
    // special fields
    pub unknown_fields: ::protobuf::UnknownFields,
    pub cached_size: ::protobuf::CachedSize,
}

impl Record {
    pub fn new() -> Record {
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

    // string record_type = 2;

    pub fn clear_record_type(&mut self) {
        self.record_type.clear();
    }

    // Param is passed by value, moved
    pub fn set_record_type(&mut self, v: ::std::string::String) {
        self.record_type = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_record_type(&mut self) -> &mut ::std::string::String {
        &mut self.record_type
    }

    // Take field
    pub fn take_record_type(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.record_type, ::std::string::String::new())
    }

    pub fn get_record_type(&self) -> &str {
        &self.record_type
    }

    // repeated .Record.AssociatedAccount owners = 3;

    pub fn clear_owners(&mut self) {
        self.owners.clear();
    }

    // Param is passed by value, moved
    pub fn set_owners(&mut self, v: ::protobuf::RepeatedField<Record_AssociatedAccount>) {
        self.owners = v;
    }

    // Mutable pointer to the field.
    pub fn mut_owners(&mut self) -> &mut ::protobuf::RepeatedField<Record_AssociatedAccount> {
        &mut self.owners
    }

    // Take field
    pub fn take_owners(&mut self) -> ::protobuf::RepeatedField<Record_AssociatedAccount> {
        ::std::mem::replace(&mut self.owners, ::protobuf::RepeatedField::new())
    }

    pub fn get_owners(&self) -> &[Record_AssociatedAccount] {
        &self.owners
    }

    // repeated .Record.AssociatedAccount custodians = 4;

    pub fn clear_custodians(&mut self) {
        self.custodians.clear();
    }

    // Param is passed by value, moved
    pub fn set_custodians(&mut self, v: ::protobuf::RepeatedField<Record_AssociatedAccount>) {
        self.custodians = v;
    }

    // Mutable pointer to the field.
    pub fn mut_custodians(&mut self) -> &mut ::protobuf::RepeatedField<Record_AssociatedAccount> {
        &mut self.custodians
    }

    // Take field
    pub fn take_custodians(&mut self) -> ::protobuf::RepeatedField<Record_AssociatedAccount> {
        ::std::mem::replace(&mut self.custodians, ::protobuf::RepeatedField::new())
    }

    pub fn get_custodians(&self) -> &[Record_AssociatedAccount] {
        &self.custodians
    }

    // bool final = 5;

    pub fn clear_field_final(&mut self) {
        self.field_final = false;
    }

    // Param is passed by value, moved
    pub fn set_field_final(&mut self, v: bool) {
        self.field_final = v;
    }

    pub fn get_field_final(&self) -> bool {
        self.field_final
    }
}

impl ::protobuf::Message for Record {
    fn is_initialized(&self) -> bool {
        for v in &self.owners {
            if !v.is_initialized() {
                return false;
            }
        };
        for v in &self.custodians {
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
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.record_id)?;
                },
                2 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.record_type)?;
                },
                3 => {
                    ::protobuf::rt::read_repeated_message_into(wire_type, is, &mut self.owners)?;
                },
                4 => {
                    ::protobuf::rt::read_repeated_message_into(wire_type, is, &mut self.custodians)?;
                },
                5 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_bool()?;
                    self.field_final = tmp;
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
        if !self.record_type.is_empty() {
            my_size += ::protobuf::rt::string_size(2, &self.record_type);
        }
        for value in &self.owners {
            let len = value.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        };
        for value in &self.custodians {
            let len = value.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        };
        if self.field_final != false {
            my_size += 2;
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if !self.record_id.is_empty() {
            os.write_string(1, &self.record_id)?;
        }
        if !self.record_type.is_empty() {
            os.write_string(2, &self.record_type)?;
        }
        for v in &self.owners {
            os.write_tag(3, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        };
        for v in &self.custodians {
            os.write_tag(4, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        };
        if self.field_final != false {
            os.write_bool(5, self.field_final)?;
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

    fn new() -> Record {
        Record::new()
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
                    |m: &Record| { &m.record_id },
                    |m: &mut Record| { &mut m.record_id },
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                    "record_type",
                    |m: &Record| { &m.record_type },
                    |m: &mut Record| { &mut m.record_type },
                ));
                fields.push(::protobuf::reflect::accessor::make_repeated_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<Record_AssociatedAccount>>(
                    "owners",
                    |m: &Record| { &m.owners },
                    |m: &mut Record| { &mut m.owners },
                ));
                fields.push(::protobuf::reflect::accessor::make_repeated_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<Record_AssociatedAccount>>(
                    "custodians",
                    |m: &Record| { &m.custodians },
                    |m: &mut Record| { &mut m.custodians },
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBool>(
                    "final",
                    |m: &Record| { &m.field_final },
                    |m: &mut Record| { &mut m.field_final },
                ));
                ::protobuf::reflect::MessageDescriptor::new::<Record>(
                    "Record",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }

    fn default_instance() -> &'static Record {
        static mut instance: ::protobuf::lazy::Lazy<Record> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const Record,
        };
        unsafe {
            instance.get(Record::new)
        }
    }
}

impl ::protobuf::Clear for Record {
    fn clear(&mut self) {
        self.clear_record_id();
        self.clear_record_type();
        self.clear_owners();
        self.clear_custodians();
        self.clear_field_final();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for Record {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for Record {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct Record_AssociatedAccount {
    // message fields
    pub account_id: ::std::string::String,
    pub timestamp: u64,
    // special fields
    pub unknown_fields: ::protobuf::UnknownFields,
    pub cached_size: ::protobuf::CachedSize,
}

impl Record_AssociatedAccount {
    pub fn new() -> Record_AssociatedAccount {
        ::std::default::Default::default()
    }

    // string account_id = 1;

    pub fn clear_account_id(&mut self) {
        self.account_id.clear();
    }

    // Param is passed by value, moved
    pub fn set_account_id(&mut self, v: ::std::string::String) {
        self.account_id = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_account_id(&mut self) -> &mut ::std::string::String {
        &mut self.account_id
    }

    // Take field
    pub fn take_account_id(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.account_id, ::std::string::String::new())
    }

    pub fn get_account_id(&self) -> &str {
        &self.account_id
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
}

impl ::protobuf::Message for Record_AssociatedAccount {
    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream) -> ::protobuf::ProtobufResult<()> {
        while !is.eof()? {
            let (field_number, wire_type) = is.read_tag_unpack()?;
            match field_number {
                1 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.account_id)?;
                },
                2 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_uint64()?;
                    self.timestamp = tmp;
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
        if !self.account_id.is_empty() {
            my_size += ::protobuf::rt::string_size(1, &self.account_id);
        }
        if self.timestamp != 0 {
            my_size += ::protobuf::rt::value_size(2, self.timestamp, ::protobuf::wire_format::WireTypeVarint);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if !self.account_id.is_empty() {
            os.write_string(1, &self.account_id)?;
        }
        if self.timestamp != 0 {
            os.write_uint64(2, self.timestamp)?;
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

    fn new() -> Record_AssociatedAccount {
        Record_AssociatedAccount::new()
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
                    "account_id",
                    |m: &Record_AssociatedAccount| { &m.account_id },
                    |m: &mut Record_AssociatedAccount| { &mut m.account_id },
                ));
                fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeUint64>(
                    "timestamp",
                    |m: &Record_AssociatedAccount| { &m.timestamp },
                    |m: &mut Record_AssociatedAccount| { &mut m.timestamp },
                ));
                ::protobuf::reflect::MessageDescriptor::new::<Record_AssociatedAccount>(
                    "Record_AssociatedAccount",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }

    fn default_instance() -> &'static Record_AssociatedAccount {
        static mut instance: ::protobuf::lazy::Lazy<Record_AssociatedAccount> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const Record_AssociatedAccount,
        };
        unsafe {
            instance.get(Record_AssociatedAccount::new)
        }
    }
}

impl ::protobuf::Clear for Record_AssociatedAccount {
    fn clear(&mut self) {
        self.clear_account_id();
        self.clear_timestamp();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for Record_AssociatedAccount {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for Record_AssociatedAccount {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct RecordContainer {
    // message fields
    pub entries: ::protobuf::RepeatedField<Record>,
    // special fields
    pub unknown_fields: ::protobuf::UnknownFields,
    pub cached_size: ::protobuf::CachedSize,
}

impl RecordContainer {
    pub fn new() -> RecordContainer {
        ::std::default::Default::default()
    }

    // repeated .Record entries = 1;

    pub fn clear_entries(&mut self) {
        self.entries.clear();
    }

    // Param is passed by value, moved
    pub fn set_entries(&mut self, v: ::protobuf::RepeatedField<Record>) {
        self.entries = v;
    }

    // Mutable pointer to the field.
    pub fn mut_entries(&mut self) -> &mut ::protobuf::RepeatedField<Record> {
        &mut self.entries
    }

    // Take field
    pub fn take_entries(&mut self) -> ::protobuf::RepeatedField<Record> {
        ::std::mem::replace(&mut self.entries, ::protobuf::RepeatedField::new())
    }

    pub fn get_entries(&self) -> &[Record] {
        &self.entries
    }
}

impl ::protobuf::Message for RecordContainer {
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

    fn new() -> RecordContainer {
        RecordContainer::new()
    }

    fn descriptor_static() -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_repeated_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<Record>>(
                    "entries",
                    |m: &RecordContainer| { &m.entries },
                    |m: &mut RecordContainer| { &mut m.entries },
                ));
                ::protobuf::reflect::MessageDescriptor::new::<RecordContainer>(
                    "RecordContainer",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }

    fn default_instance() -> &'static RecordContainer {
        static mut instance: ::protobuf::lazy::Lazy<RecordContainer> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const RecordContainer,
        };
        unsafe {
            instance.get(RecordContainer::new)
        }
    }
}

impl ::protobuf::Clear for RecordContainer {
    fn clear(&mut self) {
        self.clear_entries();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for RecordContainer {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for RecordContainer {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct RecordType {
    // message fields
    pub name: ::std::string::String,
    pub properties: ::protobuf::RepeatedField<super::property::PropertySchema>,
    // special fields
    pub unknown_fields: ::protobuf::UnknownFields,
    pub cached_size: ::protobuf::CachedSize,
}

impl RecordType {
    pub fn new() -> RecordType {
        ::std::default::Default::default()
    }

    // string name = 1;

    pub fn clear_name(&mut self) {
        self.name.clear();
    }

    // Param is passed by value, moved
    pub fn set_name(&mut self, v: ::std::string::String) {
        self.name = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_name(&mut self) -> &mut ::std::string::String {
        &mut self.name
    }

    // Take field
    pub fn take_name(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.name, ::std::string::String::new())
    }

    pub fn get_name(&self) -> &str {
        &self.name
    }

    // repeated .PropertySchema properties = 2;

    pub fn clear_properties(&mut self) {
        self.properties.clear();
    }

    // Param is passed by value, moved
    pub fn set_properties(&mut self, v: ::protobuf::RepeatedField<super::property::PropertySchema>) {
        self.properties = v;
    }

    // Mutable pointer to the field.
    pub fn mut_properties(&mut self) -> &mut ::protobuf::RepeatedField<super::property::PropertySchema> {
        &mut self.properties
    }

    // Take field
    pub fn take_properties(&mut self) -> ::protobuf::RepeatedField<super::property::PropertySchema> {
        ::std::mem::replace(&mut self.properties, ::protobuf::RepeatedField::new())
    }

    pub fn get_properties(&self) -> &[super::property::PropertySchema] {
        &self.properties
    }
}

impl ::protobuf::Message for RecordType {
    fn is_initialized(&self) -> bool {
        for v in &self.properties {
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
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.name)?;
                },
                2 => {
                    ::protobuf::rt::read_repeated_message_into(wire_type, is, &mut self.properties)?;
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
        if !self.name.is_empty() {
            my_size += ::protobuf::rt::string_size(1, &self.name);
        }
        for value in &self.properties {
            let len = value.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        };
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream) -> ::protobuf::ProtobufResult<()> {
        if !self.name.is_empty() {
            os.write_string(1, &self.name)?;
        }
        for v in &self.properties {
            os.write_tag(2, ::protobuf::wire_format::WireTypeLengthDelimited)?;
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

    fn new() -> RecordType {
        RecordType::new()
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
                    "name",
                    |m: &RecordType| { &m.name },
                    |m: &mut RecordType| { &mut m.name },
                ));
                fields.push(::protobuf::reflect::accessor::make_repeated_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<super::property::PropertySchema>>(
                    "properties",
                    |m: &RecordType| { &m.properties },
                    |m: &mut RecordType| { &mut m.properties },
                ));
                ::protobuf::reflect::MessageDescriptor::new::<RecordType>(
                    "RecordType",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }

    fn default_instance() -> &'static RecordType {
        static mut instance: ::protobuf::lazy::Lazy<RecordType> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const RecordType,
        };
        unsafe {
            instance.get(RecordType::new)
        }
    }
}

impl ::protobuf::Clear for RecordType {
    fn clear(&mut self) {
        self.clear_name();
        self.clear_properties();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for RecordType {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for RecordType {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct RecordTypeContainer {
    // message fields
    pub entries: ::protobuf::RepeatedField<RecordType>,
    // special fields
    pub unknown_fields: ::protobuf::UnknownFields,
    pub cached_size: ::protobuf::CachedSize,
}

impl RecordTypeContainer {
    pub fn new() -> RecordTypeContainer {
        ::std::default::Default::default()
    }

    // repeated .RecordType entries = 1;

    pub fn clear_entries(&mut self) {
        self.entries.clear();
    }

    // Param is passed by value, moved
    pub fn set_entries(&mut self, v: ::protobuf::RepeatedField<RecordType>) {
        self.entries = v;
    }

    // Mutable pointer to the field.
    pub fn mut_entries(&mut self) -> &mut ::protobuf::RepeatedField<RecordType> {
        &mut self.entries
    }

    // Take field
    pub fn take_entries(&mut self) -> ::protobuf::RepeatedField<RecordType> {
        ::std::mem::replace(&mut self.entries, ::protobuf::RepeatedField::new())
    }

    pub fn get_entries(&self) -> &[RecordType] {
        &self.entries
    }
}

impl ::protobuf::Message for RecordTypeContainer {
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

    fn new() -> RecordTypeContainer {
        RecordTypeContainer::new()
    }

    fn descriptor_static() -> &'static ::protobuf::reflect::MessageDescriptor {
        static mut descriptor: ::protobuf::lazy::Lazy<::protobuf::reflect::MessageDescriptor> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const ::protobuf::reflect::MessageDescriptor,
        };
        unsafe {
            descriptor.get(|| {
                let mut fields = ::std::vec::Vec::new();
                fields.push(::protobuf::reflect::accessor::make_repeated_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<RecordType>>(
                    "entries",
                    |m: &RecordTypeContainer| { &m.entries },
                    |m: &mut RecordTypeContainer| { &mut m.entries },
                ));
                ::protobuf::reflect::MessageDescriptor::new::<RecordTypeContainer>(
                    "RecordTypeContainer",
                    fields,
                    file_descriptor_proto()
                )
            })
        }
    }

    fn default_instance() -> &'static RecordTypeContainer {
        static mut instance: ::protobuf::lazy::Lazy<RecordTypeContainer> = ::protobuf::lazy::Lazy {
            lock: ::protobuf::lazy::ONCE_INIT,
            ptr: 0 as *const RecordTypeContainer,
        };
        unsafe {
            instance.get(RecordTypeContainer::new)
        }
    }
}

impl ::protobuf::Clear for RecordTypeContainer {
    fn clear(&mut self) {
        self.clear_entries();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for RecordTypeContainer {
    fn fmt(&self, f: &mut ::std::fmt::Formatter) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for RecordTypeContainer {
    fn as_ref(&self) -> ::protobuf::reflect::ProtobufValueRef {
        ::protobuf::reflect::ProtobufValueRef::Message(self)
    }
}

static file_descriptor_proto_data: &'static [u8] = b"\
    \n\x0crecord.proto\x1a\x0eproperty.proto\"\x9c\x02\n\x06Record\x12\x1b\n\
    \trecord_id\x18\x01\x20\x01(\tR\x08recordId\x12\x1f\n\x0brecord_type\x18\
    \x02\x20\x01(\tR\nrecordType\x121\n\x06owners\x18\x03\x20\x03(\x0b2\x19.\
    Record.AssociatedAccountR\x06owners\x129\n\ncustodians\x18\x04\x20\x03(\
    \x0b2\x19.Record.AssociatedAccountR\ncustodians\x12\x14\n\x05final\x18\
    \x05\x20\x01(\x08R\x05final\x1aP\n\x11AssociatedAccount\x12\x1d\n\naccou\
    nt_id\x18\x01\x20\x01(\tR\taccountId\x12\x1c\n\ttimestamp\x18\x02\x20\
    \x01(\x04R\ttimestamp\"4\n\x0fRecordContainer\x12!\n\x07entries\x18\x01\
    \x20\x03(\x0b2\x07.RecordR\x07entries\"Q\n\nRecordType\x12\x12\n\x04name\
    \x18\x01\x20\x01(\tR\x04name\x12/\n\nproperties\x18\x02\x20\x03(\x0b2\
    \x0f.PropertySchemaR\nproperties\"<\n\x13RecordTypeContainer\x12%\n\x07e\
    ntries\x18\x01\x20\x03(\x0b2\x0b.RecordTypeR\x07entriesb\x06proto3\
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
